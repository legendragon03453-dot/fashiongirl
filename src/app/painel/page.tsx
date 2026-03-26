'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText, Tag, Plus, Trash2, Image as ImageIcon, Video, Type, Save, Globe, X,
  Settings, Quote, Link as LinkIcon, Heading3, Baseline, LogOut, Loader2,
  Sparkles, LayoutDashboard, UserCircle, UploadCloud
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase/index';
import { initializeFirebase } from '@/firebase/index';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { collection, doc, setDoc, deleteDoc, onSnapshot, query, orderBy, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const INITIAL_CATEGORIES = ["Tendências", "Lifestyle", "Beleza", "Desfiles", "Street Style"];

export default function AdminPainel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(INITIAL_CATEGORIES);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);

  const [userProfile, setUserProfile] = useState<any>(null);

  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  const { firestore } = initializeFirebase();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!user) return;

    // Fetch User Profile
    const fetchProfile = async () => {
      try {
        const pSnap = await getDoc(doc(firestore, 'users', user.uid));
        if (pSnap.exists()) setUserProfile(pSnap.data());
      } catch (e) { console.error(e) }
    };
    fetchProfile();

    // Fetch Global Categories
    const fetchCats = async () => {
      try {
        const docSnap = await getDoc(doc(firestore, 'system', 'config'));
        if (docSnap.exists() && docSnap.data().categories) {
          setCategories(docSnap.data().categories);
        }
      } catch (e) { console.error(e) }
    };
    fetchCats();

    // Listen to blog posts
    const q = query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(postsData);
    });
    return () => unsubscribe();
  }, [user, firestore]);

  if (isUserLoading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-10 h-10 animate-spin text-pink-500" />
      </div>
    );
  }

  const handleCreateNewPost = () => {
    const newId = doc(collection(firestore, 'blog_posts')).id;
    const authorName = userProfile?.name || user.displayName || user.email?.split('@')[0] || "Admin";
    const authorAvatar = userProfile?.avatar || "";
    const newPost = {
      id: newId,
      title: "",
      category: categories[0] || "Geral",
      tag: "normal",
      status: "draft",
      date: new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase(),
      author: authorName,
      authorAvatar: authorAvatar,
      content: [{ type: 'paragraph', value: '', font: 'helvetica' }],
      createdAt: new Date().getTime(),
    };
    setEditingPost(newPost);
    setActiveTab('editor');
  };

  const handleEditPost = (post: any) => {
    setEditingPost({ ...post });
    setActiveTab('editor');
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Deseja mesmo excluir este post permanentemente?")) {
      await deleteDoc(doc(firestore, 'blog_posts', id));
    }
  };

  const handleSavePost = async (status = 'draft') => {
    const updatedPost = { ...editingPost, status, updatedAt: new Date().getTime() };
    await setDoc(doc(firestore, 'blog_posts', updatedPost.id), updatedPost, { merge: true });
    triggerNotification();
    setActiveTab('posts');
  };

  const togglePostStatus = async (post: any) => {
    const newStatus = post.status === 'published' ? 'draft' : 'published';
    await setDoc(doc(firestore, 'blog_posts', post.id), { status: newStatus, updatedAt: new Date().getTime() }, { merge: true });
    triggerNotification();
  };

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const Sidebar = () => (
    <div className="w-72 bg-black/40 backdrop-blur-2xl text-white h-screen fixed left-0 top-0 flex flex-col border-r border-white/10 z-50">
      <div className="p-8 border-b border-white/10 flex items-center gap-4">
        <div className="bg-gradient-to-br from-pink-400 to-purple-500 w-12 h-12 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(236,72,153,0.5)]">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-purple-300">FashionGirl</h1>
          <p className="text-[10px] text-zinc-400 tracking-widest uppercase mt-1">Admin Portal</p>
        </div>
      </div>

      <nav className="flex-1 mt-8 px-4 space-y-3">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30' : 'hover:bg-white/5 text-zinc-400'}`}
        >
          <LayoutDashboard size={18} /> Dashboard
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'posts' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30' : 'hover:bg-white/5 text-zinc-400'}`}
        >
          <FileText size={18} /> Artigos
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'categories' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30' : 'hover:bg-white/5 text-zinc-400'}`}
        >
          <Tag size={18} /> Categorias
        </button>
        <div className="my-4 border-b border-white/10 mx-4" />
        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-xl transition-all font-medium ${activeTab === 'profile' ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30' : 'hover:bg-white/5 text-zinc-400'}`}
        >
          <UserCircle size={18} /> Meu Perfil
        </button>
      </nav>

      <div className="p-6 border-t border-white/10 bg-black/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-600 flex items-center justify-center text-white font-bold text-xs shadow-inner border border-white/10 overflow-hidden">
            {userProfile?.avatar ? <img src={userProfile.avatar} className="w-full h-full object-cover" /> : user?.email?.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-xs flex-1 min-w-0">
            <p className="font-medium truncate text-zinc-200">{userProfile?.name || user?.email}</p>
            <button onClick={handleLogout} className="text-pink-400/80 hover:text-pink-400 text-[10px] uppercase tracking-wider flex items-center gap-1 mt-1 transition-colors">
              <LogOut size={10} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ProfileTab = () => {
    const [name, setName] = useState(userProfile?.name || '');
    const [bio, setBio] = useState(userProfile?.bio || '');
    const [avatarUrl, setAvatarUrl] = useState(userProfile?.avatar || '');
    const [uploading, setUploading] = useState(false);

    const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      setUploading(true);
      const file = e.target.files[0];
      const { storage } = initializeFirebase();
      const fileRef = ref(storage, `profiles/${user.uid}_${file.name}`);
      try {
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        setAvatarUrl(url);
      } catch (err) { console.error(err); }
      setUploading(false);
    };

    const handleSaveProfile = async () => {
      const data = { name, bio, avatar: avatarUrl, updatedAt: new Date().getTime() };
      await setDoc(doc(firestore, 'users', user.uid), data, { merge: true });
      setUserProfile(data);
      triggerNotification();
    };

    return (
      <div className="ml-72 p-10 lg:p-16 min-h-screen relative z-10 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">Meu Perfil</h2>
          <p className="text-zinc-400 text-sm">Configure seus dados como Autor(a) para os novos artigos publicados.</p>
        </div>

        <div className="max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-8 mb-10">
            <div className="relative w-32 h-32 rounded-full overflow-hidden bg-zinc-800 border-4 border-pink-500/20 shrink-0">
              {avatarUrl ? <img src={avatarUrl} className="w-full h-full object-cover" alt="Avatar" /> : <UserCircle className="w-full h-full text-zinc-600 p-4" />}
              {uploading && <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><Loader2 className="animate-spin text-white" /></div>}
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-zinc-300 mb-2">Foto de Perfil</h4>
              <label className="bg-white/10 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl cursor-pointer hover:bg-white/20 transition-colors inline-block text-center border border-white/5">
                {uploading ? 'Enviando...' : 'Fazer Upload'}
                <input type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" disabled={uploading} />
              </label>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Seu Nome de Autor</label>
              <input
                type="text"
                value={name} onChange={e => setName(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-pink-500 transition-all font-medium shadow-inner"
                placeholder="Ex: Marina Silva"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">Biografia Curta</label>
              <textarea
                value={bio} onChange={e => setBio(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-pink-500 transition-all min-h-[100px] font-medium shadow-inner"
                placeholder="Um pouco sobre você..."
              />
            </div>

            <button onClick={handleSaveProfile} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl py-4 mt-6 uppercase tracking-widest hover:from-pink-600 hover:to-purple-700 transition-all shadow-[0_0_20px_rgba(236,72,153,0.3)]">
              Salvar Perfil Completo
            </button>
          </div>
        </div>
      </div>
    )
  };

  const DashboardTab = () => {
    const publishedCount = posts.filter(p => p.status === 'published').length;
    const offlineCount = posts.filter(p => p.status === 'draft').length;

    return (
      <div className="ml-72 p-10 lg:p-16 min-h-screen relative z-10 w-full">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">Dashboard</h2>
          <p className="text-zinc-400 text-sm">Visão geral do conteúdo do seu blog.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-pink-500/20 transition-all" />
            <div className="relative z-10">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Total de Posts</p>
              <h3 className="text-5xl font-black text-white">{posts.length}</h3>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-emerald-500/20 transition-all" />
            <div className="relative z-10">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Posts Online</p>
              <h3 className="text-5xl font-black text-emerald-400">{publishedCount}</h3>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-amber-500/50 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-amber-500/20 transition-all" />
            <div className="relative z-10">
              <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">Posts Offline (DRAFT)</p>
              <h3 className="text-5xl font-black text-amber-400">{offlineCount}</h3>
            </div>
          </div>
        </div>

        <div className="bg-black/20 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl p-8">
          <h4 className="text-xl font-bold text-white mb-6">Ações Rápidas (Últimos Posts)</h4>
          {posts.length === 0 ? (
            <p className="text-zinc-500 text-sm">Nenhum post criado ainda.</p>
          ) : (
            <div className="space-y-4">
              {posts.slice(0, 5).map(post => (
                <div key={post.id} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                  <div className="truncate pr-4 max-w-lg">
                    <p className="font-semibold text-white truncate">{post.title || "Artigo Sem Título"}</p>
                    <p className="text-xs text-zinc-500 mt-1">{post.date} • {post.category}</p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => togglePostStatus(post)}
                      className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${post.status === 'published' ? 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' : 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20'}`}
                    >
                      {post.status === 'published' ? 'Deixar Offline' : 'Publicar Agora'}
                    </button>
                    <button onClick={() => handleDeletePost(post.id)} className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all" title="Excluir"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const PostsList = () => (
    <div className="ml-72 p-10 lg:p-16 min-h-screen relative z-10 w-full">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">Artigos Publicados</h2>
          <p className="text-zinc-400 text-sm">Gerencie todo o conteúdo editorial e criativo do FashionGirl.</p>
        </div>
        <button
          onClick={handleCreateNewPost}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3.5 rounded-xl flex items-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all font-bold shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:shadow-[0_0_25px_rgba(236,72,153,0.5)] border border-pink-400/20"
        >
          <Plus size={18} /> Novo Artigo
        </button>
      </div>

      <div className="bg-black/20 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl">
        <table className="w-full text-left border-collapse table-auto">
          <thead>
            <tr className="bg-white/5 text-[10px] uppercase tracking-[0.15em] text-zinc-400 font-bold border-b border-white/10">
              <th className="px-8 py-5">Título</th>
              <th className="px-8 py-5">Categoria</th>
              <th className="px-8 py-5">Status</th>
              <th className="px-8 py-5">Data</th>
              <th className="px-8 py-5 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-8 py-12 text-center text-zinc-500 font-medium">Nenhum artigo encontrado. Crie seu primeiro post!</td>
              </tr>
            ) : null}
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6 font-semibold text-zinc-100 max-w-[200px] truncate">{post.title || "Artigo Sem Título"}</td>
                <td className="px-8 py-6">
                  <span className="bg-pink-500/10 text-pink-400 border border-pink-500/20 px-3 py-1.5 rounded-full text-[10px] uppercase font-bold tracking-wider">{post.category}</span>
                </td>
                <td className="px-8 py-6">
                  <button onClick={() => togglePostStatus(post)} className={`inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 ${post.status === 'published' ? 'text-emerald-400' : 'text-amber-400'}`} title="Clique para alterar status">
                    <div className={`w-2 h-2 rounded-full ${post.status === 'published' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'}`} />
                    {post.status === 'published' ? 'Publicado' : 'Offline'}
                  </button>
                </td>
                <td className="px-8 py-6 text-zinc-500 text-sm font-medium">{post.date}</td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditPost(post)} className="p-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white rounded-xl transition-all border border-transparent hover:border-white/10"><Settings size={16} /></button>
                    <button onClick={() => handleDeletePost(post.id)} className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-xl transition-all border border-transparent hover:border-red-500/20"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CategoriesTab = () => {
    const [newCat, setNewCat] = useState('');

    const handleAddCat = async () => {
      if (!newCat.trim()) return;
      const updated = [...categories, newCat.trim()];
      await setDoc(doc(firestore, 'system', 'config'), { categories: updated }, { merge: true });
      setCategories(updated);
      setNewCat('');
    };

    const handleRemoveCat = async (c: string) => {
      const updated = categories.filter(cat => cat !== c);
      await setDoc(doc(firestore, 'system', 'config'), { categories: updated }, { merge: true });
      setCategories(updated);
    };

    return (
      <div className="ml-72 p-10 lg:p-16 w-full relative z-10">
        <div className="mb-12">
          <h2 className="text-4xl font-bold tracking-tight mb-3 text-white">Gerenciar Categorias</h2>
          <p className="text-zinc-400 text-sm">Organize o conteúdo do FashionGirl. Elas aparecem na seleção do Editor.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div key={idx} className="p-8 bg-white/5 border border-white/10 rounded-3xl flex justify-between items-center group hover:border-pink-500/50 hover:bg-pink-500/5 transition-all backdrop-blur-md shadow-lg">
              <span className="font-bold text-lg tracking-wide text-zinc-200">{cat}</span>
              <button onClick={() => handleRemoveCat(cat)} className="text-zinc-500 group-hover:text-pink-400 transition-all p-2 bg-white/5 rounded-xl hover:bg-white/10">
                <X size={16} />
              </button>
            </div>
          ))}

          <div className="p-8 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 transition-all bg-black/20 focus-within:border-pink-500 focus-within:bg-pink-500/5">
            <input
              value={newCat}
              onChange={e => setNewCat(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAddCat()}
              placeholder="Nova Categoria"
              className="w-full bg-transparent border-none outline-none text-center font-bold text-white placeholder:text-zinc-600"
            />
            <button onClick={handleAddCat} className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] transition-colors">Adicionar Salvar</button>
          </div>
        </div>
      </div>
    );
  };

  const BlockEditor = () => {
    const [uploadingBlock, setUploadingBlock] = useState<number | null>(null);

    const addBlock = (type: string) => {
      let defaultValue: any = '';
      if (type === 'links') defaultValue = [{ label: '', url: '' }];

      const newContent = [...editingPost.content, { type, value: defaultValue, font: 'helvetica' }];
      setEditingPost({ ...editingPost, content: newContent });
    };

    const updateBlock = (index: number, value: any) => {
      const newContent = [...editingPost.content];
      newContent[index].value = value;
      setEditingPost({ ...editingPost, content: newContent });
    };

    const handleImageUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.[0]) return;
      setUploadingBlock(index);
      const file = e.target.files[0];
      const { storage } = initializeFirebase();
      const stRef = ref(storage, `posts_images/${editingPost.id}_${new Date().getTime()}_${file.name}`);
      try {
        await uploadBytes(stRef, file);
        const url = await getDownloadURL(stRef);
        updateBlock(index, url);
      } catch (err) { console.error(err); }
      setUploadingBlock(null);
    };

    const toggleFont = (index: number) => {
      const newContent = [...editingPost.content];
      newContent[index].font = newContent[index].font === 'helvetica' ? 'quandco' : 'helvetica';
      setEditingPost({ ...editingPost, content: newContent });
    };

    const removeBlock = (index: number) => {
      const newContent = editingPost.content.filter((_: any, i: number) => i !== index);
      setEditingPost({ ...editingPost, content: newContent });
    };

    return (
      <div className="flex flex-col h-screen overflow-hidden bg-zinc-950 relative z-20 w-full">
        <div className="bg-black/40 backdrop-blur-xl border-b border-white/10 px-8 py-4 flex justify-between items-center z-30 shadow-lg">
          <div className="flex items-center gap-4 text-white">
            <button onClick={() => setActiveTab('posts')} className="p-2.5 hover:bg-white/10 bg-white/5 rounded-xl transition-colors border border-white/5"><X size={20} /></button>
            <div className="h-8 w-[1px] bg-white/10 mx-2" />
            <h3 className="font-bold text-sm tracking-wide truncate max-w-[300px] text-pink-300">{editingPost.title || "Novo Artigo"}</h3>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleSavePost('draft')} className="px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs font-bold hover:bg-white/10 text-white transition-all uppercase tracking-widest shadow-sm">Deixar Offline</button>
            <button onClick={() => handleSavePost('published')} className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 border border-pink-400/20 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:from-pink-600 hover:to-purple-700 transition-all uppercase tracking-widest shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)]">
              <Globe size={14} /> Publicar
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden relative">
          <div className="flex-1 overflow-y-auto p-12 lg:p-24 scrollbar-hide relative z-10 w-full">
            <div className="max-w-3xl mx-auto space-y-16">

              <div className="space-y-6 mb-16 bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-md shadow-xl">
                <div className="flex items-center gap-4">
                  <select
                    className="text-xs font-bold uppercase tracking-[0.15em] text-pink-400 bg-black/20 border border-pink-500/20 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-pink-500 appearance-none cursor-pointer"
                    value={editingPost.category || 'Geral'}
                    onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                  >
                    {categories.length === 0 && <option value="Geral" className="bg-zinc-900 text-white">Geral</option>}
                    {categories.map(c => <option key={c} value={c} className="bg-zinc-900 text-white">{c}</option>)}
                  </select>

                  <select
                    className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-400 bg-black/20 border border-emerald-500/20 rounded-lg px-4 py-2 outline-none focus:ring-1 focus:ring-emerald-500 appearance-none cursor-pointer"
                    value={editingPost.tag || 'normal'}
                    onChange={(e) => setEditingPost({ ...editingPost, tag: e.target.value })}
                  >
                    <option value="normal" className="bg-zinc-900 text-white">Post Normal</option>
                    <option value="destacado" className="bg-zinc-900 text-white">✨ Destacado</option>
                    <option value="novidade" className="bg-zinc-900 text-white">🔥 Novidade</option>
                  </select>
                </div>

                <input
                  type="text"
                  placeholder="Seu Título Brilhante Aqui..."
                  className="w-full text-5xl font-black tracking-tight border-none outline-none focus:ring-0 p-0 placeholder:text-zinc-600 text-white bg-transparent"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                />
              </div>

              <div className="space-y-12 pb-48 w-full">
                {editingPost.content.map((block: any, idx: number) => (
                  <div key={idx} className="group relative w-full">
                    <div className="absolute -left-16 top-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2 bg-black/60 p-1.5 rounded-xl border border-white/10 shadow-2xl z-10 backdrop-blur-md">
                      <button
                        onClick={() => toggleFont(idx)}
                        title="Alternar Estilo (Moderno/Clássico)"
                        className={`p-2 rounded-lg transition-colors ${block.font === 'quandco' ? 'bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg' : 'hover:bg-white/10 text-zinc-400'}`}
                      >
                        <Baseline size={16} />
                      </button>
                      <button onClick={() => removeBlock(idx)} className="p-2 text-zinc-400 hover:bg-red-500/20 hover:text-red-400 rounded-lg transition-colors"><Trash2 size={16} /></button>
                    </div>

                    {block.type === 'heading' && (
                      <input
                        className={`w-full text-3xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 bg-transparent ${block.font === 'quandco' ? 'font-quandco italic underline decoration-black/10' : 'font-helvetica'}`}
                        placeholder="Título da Seção..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    )}

                    {block.type === 'subtitle' && (
                      <input
                        className={`w-full text-xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 bg-transparent text-zinc-300 ${block.font === 'quandco' ? 'font-serif italic' : 'font-sans uppercase tracking-[0.2em] text-sm text-pink-400'}`}
                        placeholder="Subtítulo da Seção..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    )}

                    {block.type === 'paragraph' && (
                      <textarea
                        className={`w-full text-lg leading-relaxed text-zinc-300 border-none outline-none p-0 focus:ring-0 resize-none h-auto bg-transparent placeholder:text-zinc-700 overflow-hidden ${block.font === 'quandco' ? 'font-serif text-xl' : 'font-sans font-medium'}`}
                        placeholder="Escreva sua história aqui..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                        onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                      />
                    )}

                    {block.type === 'quote' && (
                      <div className="relative pl-12 border-l-[4px] border-pink-500 py-6 bg-white/5 rounded-r-3xl backdrop-blur-sm">
                        <textarea
                          className={`w-full text-2xl leading-relaxed text-pink-50 border-none outline-none p-0 pr-6 focus:ring-0 resize-none h-auto bg-transparent placeholder:text-zinc-600 overflow-hidden ${block.font === 'quandco' ? 'font-serif' : 'font-sans italic'}`}
                          placeholder="Uma citação que inspira..."
                          value={block.value}
                          onChange={(e) => updateBlock(idx, e.target.value)}
                          onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                        />
                        <Quote size={28} className="absolute -left-8 top-[-10px] text-pink-500 fill-pink-500 opacity-20" />
                      </div>
                    )}

                    {block.type === 'links' && (
                      <div className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 backdrop-blur-md">
                        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                          <LinkIcon size={18} className="text-pink-400" />
                          <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">Curadoria de Links</h5>
                        </div>
                        <div className="space-y-4">
                          {block.value.map((link: any, lIdx: number) => (
                            <div key={lIdx} className="flex gap-4 w-full">
                              <input
                                placeholder="Texto"
                                className="w-1/3 bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-pink-500 transition-colors"
                                value={link.label}
                                onChange={(e) => {
                                  const newLinks = [...block.value];
                                  newLinks[lIdx].label = e.target.value;
                                  updateBlock(idx, newLinks);
                                }}
                              />
                              <input
                                placeholder="https://..."
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-3 text-sm text-white outline-none focus:border-pink-500 transition-colors"
                                value={link.url}
                                onChange={(e) => {
                                  const newLinks = [...block.value];
                                  newLinks[lIdx].url = e.target.value;
                                  updateBlock(idx, newLinks);
                                }}
                              />
                              <button
                                onClick={() => {
                                  const newLinks = block.value.filter((_: any, i: number) => i !== lIdx);
                                  updateBlock(idx, newLinks);
                                }}
                                className="p-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-colors"
                              ><X size={18} /></button>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => updateBlock(idx, [...block.value, { label: '', url: '' }])}
                          className="w-full py-4 border-2 border-dashed border-white/10 text-white/40 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-pink-500 hover:text-pink-400"
                        >+ Adicionar Link</button>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="bg-white/5 border-2 border-dashed border-white/10 hover:border-pink-500/50 rounded-[2rem] p-16 text-center group/img relative overflow-hidden transition-all backdrop-blur-md w-full">
                        {uploadingBlock === idx && (
                          <div className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center text-pink-400">
                            <Loader2 size={48} className="animate-spin mb-4" />
                            <span className="text-xs font-bold uppercase tracking-widest">Enviando Imagem...</span>
                          </div>
                        )}
                        {block.value ? (
                          <div className="relative group/view">
                            <img src={block.value} className="w-full rounded-2xl shadow-2xl object-cover max-h-[600px]" alt="Upload preview" />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/view:opacity-100 flex items-center justify-center transition-all cursor-pointer rounded-2xl backdrop-blur-sm">
                              <button onClick={() => updateBlock(idx, '')} className="bg-red-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.5)] transform hover:scale-110 transition-all"><X size={24} /></button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-pink-400 border border-pink-500/30">
                              <UploadCloud size={32} />
                            </div>
                            <div className="max-w-md mx-auto space-y-3">
                              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">IMAGEM OBRIGATÓRIA AQUI</p>
                              <label className="block bg-pink-600 hover:bg-pink-500 text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest text-xs cursor-pointer shadow-lg w-fit mx-auto transition-colors">
                                ESCOLHER ARQUIVO DO COMPUTADOR
                                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(idx, e)} />
                              </label>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === 'video' && (
                      <div className="bg-black text-white p-12 rounded-[2rem] flex flex-col items-center gap-6 text-center shadow-2xl overflow-hidden relative border border-white/10 w-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500" />
                        <Video size={48} className="text-white opacity-20" />
                        <div className="w-full max-w-md space-y-4">
                          <input
                            type="text"
                            placeholder="URL do vídeo (YouTube ou Vimeo)..."
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-sm text-white outline-none focus:border-pink-500 transition-all text-center shadow-inner"
                            value={block.value}
                            onChange={(e) => updateBlock(idx, e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80 shrink-0 bg-black/40 border-l border-white/10 p-8 flex flex-col z-20 backdrop-blur-xl">
            <div className="mb-10">
              <h4 className="text-[10px] uppercase font-black tracking-[0.25em] text-pink-400 mb-6 flex items-center gap-2">
                <Sparkles size={14} /> Elementos
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => addBlock('heading')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <span className="font-bold text-lg group-hover:scale-110 transition-transform">H1</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">Título principal</span>
                </button>
                <button onClick={() => addBlock('subtitle')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <Heading3 size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Subtítulo</span>
                </button>
                <button onClick={() => addBlock('paragraph')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <Type size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Parágrafo</span>
                </button>
                <button onClick={() => addBlock('quote')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <Quote size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Citação</span>
                </button>
                <button onClick={() => addBlock('image')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <ImageIcon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Imagem upload</span>
                </button>
                <button onClick={() => addBlock('video')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group text-zinc-400">
                  <Video size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Vídeo embed</span>
                </button>
                <button onClick={() => addBlock('links')} className="flex flex-col items-center justify-center gap-3 p-5 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-pink-500/50 hover:text-pink-400 transition-all group col-span-2 text-zinc-400">
                  <LinkIcon size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Coleção de Links</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-zinc-950 min-h-screen text-white relative overflow-hidden font-sans flex text-left w-full">
      {/* Dynamic Background */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000 pointer-events-none" />

      <div className={`fixed bottom-10 inset-x-0 mx-auto w-max bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-[0_10px_40px_rgba(236,72,153,0.4)] z-[100] transition-all duration-500 transform ${showNotification ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-3 font-bold text-[11px] tracking-[0.2em] uppercase">
          <Sparkles className="w-4 h-4 text-pink-200 animate-pulse" /> Documento Salvo!
        </div>
      </div>

      {activeTab === 'editor' ? (
        <BlockEditor />
      ) : (
        <div className="flex w-full relative z-10">
          <Sidebar />
          {activeTab === 'dashboard' && <DashboardTab />}
          {activeTab === 'posts' && <PostsList />}
          {activeTab === 'categories' && <CategoriesTab />}
          {activeTab === 'profile' && <ProfileTab />}
        </div>
      )}
    </div>
  );
}
