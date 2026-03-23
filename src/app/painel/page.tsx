
'use client';

import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  Tag, 
  Plus, 
  Trash2, 
  Image as ImageIcon, 
  Video, 
  Type, 
  Save, 
  Globe, 
  X,
  Settings,
  Quote,
  Link as LinkIcon,
  Heading3,
  Baseline,
  ChevronDown,
  LogOut,
  Loader2
} from 'lucide-react';
import { useAuth, useUser } from '@/firebase/index';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

const INITIAL_CATEGORIES = ["Tendências", "Lifestyle", "Beleza", "Desfiles", "Street Style"];

const INITIAL_POSTS = [
  {
    id: 1,
    title: "O Renascimento do Minimalismo em 2024",
    category: "Tendências",
    status: "published",
    date: "15/05/2024",
    author: "Fashion Girl Team",
    content: [
      { type: 'heading', value: 'A elegância do menos é mais', font: 'helvetica' },
      { type: 'quote', value: 'A moda passa, o estilo permanece.', font: 'quandco' },
      { type: 'paragraph', value: 'Nesta temporada, observamos um retorno às linhas limpas e paletas neutras...', font: 'helvetica' }
    ]
  }
];

export default function AdminPainel() {
  const [activeTab, setActiveTab] = useState('posts'); 
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [editingPost, setEditingPost] = useState<any>(null);
  const [showNotification, setShowNotification] = useState(false);
  
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="w-10 h-10 animate-spin text-black" />
      </div>
    );
  }

  if (!user) return null;

  const handleCreateNewPost = () => {
    const newPost = {
      id: Date.now(),
      title: "",
      category: categories[0],
      status: "draft",
      date: new Date().toLocaleDateString(),
      author: user.displayName || user.email || "Fashion Girl Admin",
      content: [{ type: 'paragraph', value: '', font: 'helvetica' }]
    };
    setEditingPost(newPost);
    setActiveTab('editor');
  };

  const handleEditPost = (post: any) => {
    setEditingPost({ ...post });
    setActiveTab('editor');
  };

  const handleDeletePost = (id: number) => {
    setPosts(posts.filter(p => p.id !== id));
  };

  const handleSavePost = (status = 'draft') => {
    const updatedPost = { ...editingPost, status };
    if (posts.find(p => p.id === updatedPost.id)) {
      setPosts(posts.map(p => p.id === updatedPost.id ? updatedPost : p));
    } else {
      setPosts([updatedPost, ...posts]);
    }
    triggerNotification();
    setActiveTab('posts');
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
    <div className="w-64 bg-black text-white h-screen fixed left-0 top-0 flex flex-col border-r border-gray-800">
      <div className="p-8 border-b border-gray-800">
        <h1 className="text-xl font-bold tracking-tighter uppercase italic">Fashion Girl</h1>
        <p className="text-[10px] text-gray-500 tracking-widest uppercase mt-1">Admin CRM v2.0</p>
      </div>
      
      <nav className="flex-1 mt-6 px-4 space-y-2">
        <button 
          onClick={() => setActiveTab('posts')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'posts' ? 'bg-white text-black font-bold' : 'hover:bg-gray-900 text-gray-400'}`}
        >
          <FileText size={18} /> Posts
        </button>
        <button 
          onClick={() => setActiveTab('categories')}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeTab === 'categories' ? 'bg-white text-black font-bold' : 'hover:bg-gray-900 text-gray-400'}`}
        >
          <Tag size={18} /> Categorias
        </button>
      </nav>

      <div className="p-6 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black font-bold text-xs italic">
            {user?.email?.substring(0, 2).toUpperCase()}
          </div>
          <div className="text-xs">
            <p className="font-medium truncate max-w-[120px]">{user?.email}</p>
            <button onClick={handleLogout} className="text-gray-500 text-[10px] uppercase hover:text-white flex items-center gap-1 mt-1">
              <LogOut size={10} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PostsList = () => (
    <div className="ml-64 p-10 bg-white min-h-screen">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">Blog Posts</h2>
          <p className="text-gray-500">Gerencie todo o conteúdo editorial do Fashion Girl.</p>
        </div>
        <button 
          onClick={handleCreateNewPost}
          className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-all font-medium"
        >
          <Plus size={18} /> Novo Post
        </button>
      </div>

      <div className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-[10px] uppercase tracking-widest text-gray-400 font-bold border-b border-gray-100">
              <th className="px-6 py-4">Título</th>
              <th className="px-6 py-4">Categoria</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Data</th>
              <th className="px-6 py-4 text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-5 font-bold text-gray-900">{post.title || "Post Sem Título"}</td>
                <td className="px-6 py-5">
                  <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-tight">{post.category}</span>
                </td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${post.status === 'published' ? 'text-green-600' : 'text-orange-500'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${post.status === 'published' ? 'bg-green-600' : 'bg-orange-500'}`} />
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </td>
                <td className="px-6 py-5 text-gray-400 text-sm">{post.date}</td>
                <td className="px-6 py-5 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => handleEditPost(post)} className="p-2 hover:bg-black hover:text-white rounded-lg transition-all"><Settings size={16} /></button>
                    <button onClick={() => handleDeletePost(post.id)} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-lg transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BlockEditor = () => {
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
      <div className="ml-64 flex flex-col h-screen bg-gray-50 overflow-hidden">
        <div className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setActiveTab('posts')} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X size={20} /></button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2" />
            <h3 className="font-bold text-sm tracking-tight truncate max-w-[200px]">{editingPost.title || "Novo Artigo"}</h3>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => handleSavePost('draft')} className="px-6 py-2 border border-black rounded-full text-xs font-bold hover:bg-black hover:text-white transition-all uppercase tracking-widest">Salvar Rascunho</button>
            <button onClick={() => handleSavePost('published')} className="px-6 py-2 bg-black text-white rounded-full text-xs font-bold flex items-center gap-2 hover:bg-gray-800 transition-all uppercase tracking-widest">
              <Globe size={14} /> Publicar
            </button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto p-12 lg:p-24 bg-white">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="space-y-4 mb-16">
                <div className="flex items-center gap-2">
                   <select 
                    className="text-[10px] font-bold uppercase tracking-widest text-gray-400 bg-transparent border-none outline-none focus:ring-0 p-0 hover:text-black cursor-pointer appearance-none"
                    value={editingPost.category}
                    onChange={(e) => setEditingPost({...editingPost, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <ChevronDown size={12} className="text-gray-400" />
                </div>
                
                <input 
                  type="text" 
                  placeholder="Insira o título aqui..."
                  className="w-full text-5xl font-black tracking-tighter border-none outline-none focus:ring-0 p-0 placeholder:text-gray-100 font-['Helvetica']"
                  value={editingPost.title}
                  onChange={(e) => setEditingPost({...editingPost, title: e.target.value})}
                />
              </div>

              <div className="space-y-12 pb-48">
                {editingPost.content.map((block: any, idx: number) => (
                  <div key={idx} className="group relative">
                    <div className="absolute -left-14 top-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col gap-2 bg-white p-1 rounded-full border border-gray-100 shadow-xl z-10 scale-90">
                      <button 
                        onClick={() => toggleFont(idx)} 
                        title="Alternar Fonte (Helvetica/Quandco)" 
                        className={`p-2 rounded-full transition-colors ${block.font === 'quandco' ? 'bg-black text-white' : 'hover:bg-gray-100 text-gray-400'}`}
                      >
                        <Baseline size={14} />
                      </button>
                      <button onClick={() => removeBlock(idx)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                    </div>
                    
                    {block.type === 'heading' && (
                      <input 
                        className={`w-full text-3xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 bg-transparent ${block.font === 'quandco' ? 'font-['Quandco'] italic underline decoration-black/10' : 'font-['Helvetica']'}`}
                        placeholder="Título de Seção..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    )}

                    {block.type === 'subtitle' && (
                      <input 
                        className={`w-full text-xl font-bold tracking-tight border-none outline-none p-0 focus:ring-0 bg-transparent opacity-70 ${block.font === 'quandco' ? 'font-['Quandco'] italic' : 'font-['Helvetica'] uppercase tracking-widest text-sm'}`}
                        placeholder="Subtítulo ou Seção Secundária..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                      />
                    )}
                    
                    {block.type === 'paragraph' && (
                      <textarea 
                        className={`w-full text-lg leading-relaxed text-gray-800 border-none outline-none p-0 focus:ring-0 resize-none h-auto bg-transparent ${block.font === 'quandco' ? 'font-['Quandco'] text-xl' : 'font-['Helvetica']'}`}
                        placeholder="Desenvolva seu texto aqui..."
                        value={block.value}
                        onChange={(e) => updateBlock(idx, e.target.value)}
                        onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                      />
                    )}

                    {block.type === 'quote' && (
                      <div className="relative pl-10 border-l-[3px] border-black py-4 my-8">
                        <textarea 
                          className={`w-full text-2xl leading-relaxed text-black border-none outline-none p-0 focus:ring-0 resize-none h-auto bg-transparent ${block.font === 'quandco' ? 'font-['Quandco']' : 'font-['Helvetica'] italic'}`}
                          placeholder="Digite uma citação inspiradora..."
                          value={block.value}
                          onChange={(e) => updateBlock(idx, e.target.value)}
                          onInput={(e: any) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
                        />
                        <Quote size={20} className="absolute -left-12 top-4 text-gray-200" />
                      </div>
                    )}

                    {block.type === 'links' && (
                      <div className="bg-gray-50/50 border border-gray-100 p-8 rounded-3xl space-y-6">
                        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
                           <LinkIcon size={16} className="text-black" />
                           <h5 className="text-[10px] font-bold uppercase tracking-[0.2em] text-black">Curadoria de Links</h5>
                        </div>
                        <div className="space-y-3">
                          {block.value.map((link: any, lIdx: number) => (
                            <div key={lIdx} className="flex gap-3">
                              <input 
                                placeholder="Texto do Link"
                                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black font-['Helvetica'] shadow-sm"
                                value={link.label}
                                onChange={(e) => {
                                  const newLinks = [...block.value];
                                  newLinks[lIdx].label = e.target.value;
                                  updateBlock(idx, newLinks);
                                }}
                              />
                              <input 
                                placeholder="https://..."
                                className="flex-[2] bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black font-['Helvetica'] shadow-sm"
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
                                className="p-3 text-gray-300 hover:text-red-500 transition-colors"
                              ><X size={18} /></button>
                            </div>
                          ))}
                        </div>
                        <button 
                          onClick={() => updateBlock(idx, [...block.value, { label: '', url: '' }])}
                          className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:border-black hover:text-black transition-all"
                        >+ Adicionar Novo Link</button>
                      </div>
                    )}

                    {block.type === 'image' && (
                      <div className="bg-gray-50 border-2 border-dashed border-gray-100 rounded-3xl p-16 text-center group/img relative overflow-hidden transition-colors hover:bg-gray-100/50">
                        {block.value ? (
                          <div className="relative group/view">
                            <img src={block.value} className="w-full rounded-2xl shadow-lg" alt="Upload preview" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/view:opacity-100 flex items-center justify-center transition-all cursor-pointer rounded-2xl backdrop-blur-sm">
                               <button onClick={() => updateBlock(idx, '')} className="bg-white text-black p-3 rounded-full shadow-xl"><X size={24} /></button>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-6">
                            <div className="bg-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center mx-auto text-black">
                              <ImageIcon size={28} />
                            </div>
                            <div className="max-w-xs mx-auto space-y-2">
                                <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Arraste ou cole a URL</p>
                                <input 
                                  type="text" 
                                  placeholder="Link da imagem (jpg, png, webp)..."
                                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black text-center shadow-sm"
                                  onKeyDown={(e: any) => e.key === 'Enter' && updateBlock(idx, e.target.value)}
                                />
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {block.type === 'video' && (
                      <div className="bg-black text-white p-12 rounded-3xl flex flex-col items-center gap-6 text-center shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <Video size={40} className="text-white opacity-20" />
                        <div className="w-full max-w-md space-y-3">
                          <input 
                            type="text" 
                            placeholder="URL do vídeo (YouTube ou Vimeo)..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-white focus:bg-white/10 transition-all text-center"
                            value={block.value}
                            onChange={(e) => updateBlock(idx, e.target.value)}
                          />
                          <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-500">O player aparecerá no site publicado</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-80 bg-white border-l border-gray-100 p-8 flex flex-col overflow-y-auto">
            <div className="mb-10">
              <h4 className="text-[11px] uppercase font-black tracking-[0.3em] text-gray-300 mb-8 border-b border-gray-50 pb-4">Biblioteca de Estilos</h4>
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => addBlock('heading')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                  <span className="font-black text-xl text-gray-400 group-hover:text-black">H1</span>
                  <span className="text-[9px] font-bold uppercase tracking-widest">Título</span>
                </button>
                <button onClick={() => addBlock('subtitle')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                   <Heading3 size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Subtítulo</span>
                </button>
                <button onClick={() => addBlock('paragraph')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                  <Type size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Parágrafo</span>
                </button>
                <button onClick={() => addBlock('quote')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                  <Quote size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Citação</span>
                </button>
                <button onClick={() => addBlock('image')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                  <ImageIcon size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Imagem</span>
                </button>
                <button onClick={() => addBlock('video')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group bg-white">
                  <Video size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Vídeo</span>
                </button>
                <button onClick={() => addBlock('links')} className="flex flex-col items-center justify-center gap-3 p-6 border border-gray-100 rounded-3xl hover:border-black hover:shadow-xl transition-all group col-span-2 bg-white">
                  <LinkIcon size={20} className="text-gray-300 group-hover:text-black" />
                  <span className="text-[9px] font-bold uppercase tracking-widest">Bloco de Links</span>
                </button>
              </div>
            </div>

            <div className="mt-auto p-6 bg-gray-50 rounded-[2.5rem] border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Baseline size={14} className="text-black" />
                  <h6 className="text-[10px] font-black uppercase tracking-widest text-black">Tipografia Mixta</h6>
                </div>
                <p className="text-[10px] leading-relaxed text-gray-500 italic">
                  Você pode alternar cada bloco entre **Helvetica** (Editorial Moderno) e **Quandco** (Classic Luxury) usando o menu lateral que aparece ao passar o mouse sobre o elemento.
                </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="font-['Helvetica',_sans-serif] text-black antialiased">
      <div className={`fixed top-12 right-12 bg-black text-white px-10 py-5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-[100] transition-all duration-700 transform ${showNotification ? 'translate-y-0 opacity-100' : '-translate-y-32 opacity-0'}`}>
        <div className="flex items-center gap-4 font-bold text-xs tracking-[0.2em] uppercase">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Conteúdo Atualizado
        </div>
      </div>

      {activeTab === 'editor' ? (
        <BlockEditor />
      ) : (
        <div className="bg-white min-h-screen">
          <Sidebar />
          {activeTab === 'posts' && <PostsList />}
          {activeTab === 'categories' && (
             <div className="ml-64 p-10 min-h-screen">
                <div className="mb-12">
                  <h2 className="text-4xl font-bold tracking-tight mb-2">Categorias</h2>
                  <p className="text-gray-500">Estruture os tópicos principais do Fashion Girl.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categories.map((cat, idx) => (
                    <div key={idx} className="p-8 border border-gray-100 rounded-[2rem] flex justify-between items-center group hover:border-black hover:shadow-xl transition-all bg-white">
                      <span className="font-bold text-lg tracking-tight">{cat}</span>
                      <button className="text-gray-300 group-hover:text-red-500 transition-all p-2">
                        <X size={20} />
                      </button>
                    </div>
                  ))}
                  <button className="p-8 border-2 border-dashed border-gray-100 rounded-[2rem] flex flex-col items-center justify-center gap-3 text-gray-300 hover:border-black hover:text-black transition-all bg-gray-50/30">
                    <Plus size={32} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">Criar Nova</span>
                  </button>
                </div>
             </div>
          )}
        </div>
      )}
    </div>
  );
}
