import { useMemo, useState } from 'react'
import {
  ShoppingCart,
  Plus,
  Minus,
  MessageCircle,
  Search,
  Trash2,
  Star,
  ShieldCheck,
  Truck,
  Sparkles,
  Clock3,
  CalendarDays,
  MapPin,
  Phone,
  CheckCircle2,
  Package,
  ArrowRight,
} from 'lucide-react'

const WHATSAPP_NUMBER = '351933499207'
const COMPANY_NAME = 'Catálogo de Encomendas'

const DELIVERY_DAYS = [
  { day: 'Terça-feira', time: '14:00 - 19:00' },
  { day: 'Sexta-feira', time: '09:00 - 18:00' },
]

const SERVICE_AREAS = ['Costa da Caparica', 'Almada', 'Margem Sul']

const PRODUCTS = [
  {
    id: 1,
    name: 'Coca-Cola 33cl',
    category: 'Refrigerantes',
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1200&auto=format&fit=crop',
    description: 'Lata individual fresca e pronta a servir.',
    featured: true,
  },
  {
    id: 2,
    name: 'Fanta Laranja 33cl',
    category: 'Refrigerantes',
    price: 1.2,
    image:
      'https://images.unsplash.com/photo-1624517452488-04869289c4ca?q=80&w=1200&auto=format&fit=crop',
    description: 'Bebida refrescante sabor laranja.',
    featured: false,
  },
  {
    id: 3,
    name: 'Água 50cl',
    category: 'Águas',
    price: 0.8,
    image:
      'https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=1200&auto=format&fit=crop',
    description: 'Garrafa prática para qualquer ocasião.',
    featured: false,
  },
  {
    id: 4,
    name: 'Sumo de Manga 1L',
    category: 'Sumos',
    price: 2.5,
    image:
      'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?q=80&w=1200&auto=format&fit=crop',
    description: 'Ideal para partilhar em casa ou no trabalho.',
    featured: true,
  },
  {
    id: 5,
    name: 'Red Bull 25cl',
    category: 'Energéticas',
    price: 1.9,
    image:
      'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?q=80&w=1200&auto=format&fit=crop',
    description: 'Energia rápida em formato compacto.',
    featured: true,
  },
  {
    id: 6,
    name: 'Ice Tea Pêssego 33cl',
    category: 'Refrigerantes',
    price: 1.3,
    image:
      'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=1200&auto=format&fit=crop',
    description: 'Sabor leve e refrescante.',
    featured: false,
  },
]

const categories = ['Todos', ...new Set(PRODUCTS.map((p) => p.category))]

function SectionCard({ icon, title, children }) {
  return (
    <div className="section-card">
      <div className="icon-box">{icon}</div>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('Todos')
  const [cart, setCart] = useState([])
  const [clientName, setClientName] = useState('')
  const [notes, setNotes] = useState('')

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory =
        selectedCategory === 'Todos' || product.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [search, selectedCategory])

  const addToCart = (product) => {
    setCart((current) => {
      const found = current.find((item) => item.id === product.id)
      if (found) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  const changeQuantity = (id, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + delta } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id) => {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const whatsappMessage = useMemo(() => {
    if (cart.length === 0) return ''

    const lines = [
      `Olá! Quero fazer uma encomenda através do ${COMPANY_NAME}:`,
      '',
      ...cart.map(
        (item) => `• ${item.name} x${item.quantity} — €${(item.price * item.quantity).toFixed(2)}`,
      ),
      '',
      `Total: €${total.toFixed(2)}`,
    ]

    if (clientName.trim()) lines.push(`Nome: ${clientName.trim()}`)
    if (notes.trim()) lines.push(`Notas: ${notes.trim()}`)

    lines.push('', 'Aguardo confirmação de disponibilidade e entrega.')

    return encodeURIComponent(lines.join('\n'))
  }, [cart, total, clientName, notes])

  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`

  return (
    <div className="page-shell">
      <div className="container">
        <header className="hero">
          <div className="hero-glow hero-glow-right" />
          <div className="hero-glow hero-glow-left" />

          <div className="hero-grid">
            <div>
              <div className="pill dark-pill">
                <Sparkles size={16} />
                Catálogo online com encomenda direta por WhatsApp
              </div>

              <h1>{COMPANY_NAME}</h1>
              <p className="hero-text">
                Uma forma simples e profissional de apresentar produtos, receber pedidos
                e organizar entregas. Os clientes escolhem no catálogo, enviam a
                encomenda por WhatsApp e recebem confirmação de disponibilidade e entrega.
              </p>

              <div className="hero-stats">
                <div className="hero-stat">
                  <Truck size={16} />
                  <div>
                    <strong>Entregas programadas</strong>
                    <span>1 ou 2 dias por semana</span>
                  </div>
                </div>
                <div className="hero-stat">
                  <ShieldCheck size={16} />
                  <div>
                    <strong>Processo simples</strong>
                    <span>Pedido enviado em segundos</span>
                  </div>
                </div>
                <div className="hero-stat">
                  <Star size={16} />
                  <div>
                    <strong>Mais flexibilidade</strong>
                    <span>Tentamos adaptar ao cliente</span>
                  </div>
                </div>
              </div>

              <div className="hero-actions">
                <a href="#catalogo" className="btn btn-primary">
                  Ver catálogo <ArrowRight size={18} />
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary"
                >
                  <MessageCircle size={18} /> Contactar por WhatsApp
                </a>
              </div>
            </div>

            <div className="hero-card-wrapper">
              <div className="hero-card">
                <div className="hero-card-top">
                  <div>
                    <span>Resumo rápido</span>
                    <h2>Como funciona</h2>
                  </div>
                  <div className="mini-tag">Fácil</div>
                </div>

                <div className="steps-list">
                  <div className="step-box">
                    <strong>1. Escolhe os produtos</strong>
                    <span>Navega no catálogo e adiciona ao pedido.</span>
                  </div>
                  <div className="step-box">
                    <strong>2. Envia a encomenda</strong>
                    <span>O WhatsApp abre com a mensagem pronta.</span>
                  </div>
                  <div className="step-box">
                    <strong>3. Confirmamos a entrega</strong>
                    <span>Respondemos com disponibilidade e horário.</span>
                  </div>
                </div>

                <div className="dashed-note">
                  Ideal para pequenas empresas que querem vender de forma simples,
                  profissional e direta.
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="three-grid">
          <SectionCard icon={<CalendarDays size={24} />} title="Dias de entrega">
            <p>
              Trabalhamos com dias de entrega definidos para garantir melhor organização
              e um serviço mais eficiente.
            </p>
            <div className="info-list">
              {DELIVERY_DAYS.map((item) => (
                <div key={item.day} className="info-box">
                  <strong>{item.day}</strong>
                  <span>Horário: {item.time}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard icon={<Clock3 size={24} />} title="Flexibilidade">
            <p>
              Apesar de termos dias de entrega definidos, como empresa pequena tentamos
              adaptar-nos às necessidades dos clientes sempre que possível.
            </p>
            <div className="highlight-note">
              Se precisares de uma entrega fora dos dias habituais, entra em contacto
              connosco e tentaremos encontrar a melhor solução.
            </div>
          </SectionCard>

          <SectionCard icon={<MapPin size={24} />} title="Zona de atendimento">
            <p>
              Atendemos sobretudo nas seguintes zonas, com possibilidade de avaliar pedidos
              noutras localizações.
            </p>
            <div className="tag-list">
              {SERVICE_AREAS.map((area) => (
                <span key={area} className="tag">
                  {area}
                </span>
              ))}
            </div>
          </SectionCard>
        </section>

        <section className="two-grid">
          <SectionCard icon={<Package size={24} />} title="Informações úteis">
            <div className="check-list">
              <div className="check-item">
                <CheckCircle2 size={18} />
                <span>
                  Os pedidos são enviados por WhatsApp e confirmados manualmente para
                  garantir disponibilidade de stock.
                </span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} />
                <span>
                  O horário e dia de entrega podem variar conforme a zona, volume do
                  pedido e disponibilidade.
                </span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} />
                <span>
                  Podes usar o campo de notas para deixar morada, referência, horário
                  preferido ou qualquer pedido especial.
                </span>
              </div>
              <div className="check-item">
                <CheckCircle2 size={18} />
                <span>
                  Esta página pode ser adaptada mais tarde com nome da empresa, logótipo,
                  produtos reais, preços por caixa e condições de entrega.
                </span>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={<Phone size={24} />} title="Contacto rápido">
            <p>
              Tens dúvidas antes de encomendar? Podes entrar em contacto diretamente pelo
              WhatsApp.
            </p>
            <div className="contact-box">
              <span>WhatsApp</span>
              <strong>+351 933 499 207</strong>
            </div>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary full-btn"
            >
              <MessageCircle size={18} /> Abrir conversa no WhatsApp
            </a>
          </SectionCard>
        </section>

        <section className="catalog-layout">
          <div className="catalog-main">
            <section id="catalogo" className="catalog-header-card">
              <div>
                <h2>Catálogo</h2>
                <p>Pesquisa, filtra por categoria e adiciona ao carrinho.</p>
              </div>
              <div className="cart-badge">
                <ShoppingCart size={16} /> {totalItems} itens no carrinho
              </div>
            </section>

            <div className="filter-row">
              <div className="search-box">
                <Search size={18} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Pesquisar produto..."
                />
              </div>
              <div className="categories-row">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={selectedCategory === category ? 'category active' : 'category'}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="products-grid">
              {filteredProducts.map((product) => (
                <article key={product.id} className="product-card">
                  <div className="product-image-wrap">
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-badges">
                      <span className="tag floating-tag">{product.category}</span>
                      {product.featured && <span className="featured-tag">Destaque</span>}
                    </div>
                  </div>

                  <div className="product-content">
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <div className="product-footer">
                      <div>
                        <span className="price-label">Preço</span>
                        <strong className="price">€{product.price.toFixed(2)}</strong>
                      </div>
                      <button onClick={() => addToCart(product)} className="btn btn-primary">
                        <Plus size={16} /> Adicionar
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="cart-sidebar">
            <div className="cart-card">
              <div className="cart-header">
                <div>
                  <span>Carrinho</span>
                  <h2>A tua encomenda</h2>
                </div>
                <div className="mini-tag">{totalItems} itens</div>
              </div>

              <div className="cart-items">
                {cart.length === 0 ? (
                  <div className="empty-cart">Ainda não adicionaste produtos ao pedido.</div>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-top">
                        <div>
                          <strong>{item.name}</strong>
                          <span>€{item.price.toFixed(2)} cada</span>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="icon-btn">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="cart-item-bottom">
                        <div className="quantity-controls">
                          <button onClick={() => changeQuantity(item.id, -1)}>
                            <Minus size={15} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => changeQuantity(item.id, 1)}>
                            <Plus size={15} />
                          </button>
                        </div>
                        <strong>€{(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="form-block">
                <input
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Nome do cliente"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notas do pedido, morada, horário preferido, referência, etc."
                />
              </div>

              <div className="total-box">
                <span>Total do pedido</span>
                <strong>€{total.toFixed(2)}</strong>
              </div>

              <a
                href={cart.length ? whatsappLink : '#'}
                target="_blank"
                rel="noreferrer"
                className={`btn btn-primary full-btn ${cart.length === 0 ? 'disabled-link' : ''}`}
                onClick={(e) => {
                  if (cart.length === 0) e.preventDefault()
                }}
              >
                <MessageCircle size={18} /> Enviar encomenda por WhatsApp
              </a>

              <p className="cart-note">
                O pedido será enviado para o número configurado nesta página e depois
                confirmado manualmente.
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}

export default App
