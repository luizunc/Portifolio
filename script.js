// Elementos do DOM
const themeSwitch = document.querySelector('.theme-switch');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const header = document.querySelector('header');
const contactForm = document.querySelector('.contato-form');
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');
const heroSection = document.querySelector('.hero');
const progressBars = document.querySelectorAll('.level-bar');

// Configuração do tema
const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Atualiza o ícone do tema
    const icon = themeSwitch.querySelector('i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    icon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        icon.style.transform = 'rotate(0deg)';
    }, 300);
};

// Inicializa o tema
const savedTheme = localStorage.getItem('theme') || 'light';
setTheme(savedTheme);

// Event Listeners
themeSwitch.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Menu Mobile
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
    });
});

// Animação do Header no Scroll
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Animação de elementos ao entrar na viewport
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa elementos para animação
document.querySelectorAll('.projeto-card, .habilidade-categoria, .info-card').forEach(el => {
    observer.observe(el);
});

// Efeito de Parallax no Hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroSection) {
        heroSection.style.backgroundPositionY = `${scrolled * 0.5}px`;
    }
});

// Envio do formulário de contato para backend próprio
const contatoForm = document.querySelector('.contato-form');
if (contatoForm) {
  contatoForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    try {
      const response = await fetch('http://localhost:3001/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email, mensagem })
      });
      if (response.ok) {
        alert('Mensagem enviada com sucesso!');
        contatoForm.reset();
      } else {
        alert('Erro ao enviar mensagem.');
      }
    } catch (err) {
      alert('Erro ao conectar com o servidor.');
    }
  });
}

// Efeito de Digitação no Título
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.innerHTML = '';
    
    const type = () => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };
    
    type();
};

// Inicia o efeito de digitação quando a página carrega
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeWriter(heroTitle, heroTitle.textContent, 150);
    }
});

// Destaque do item de navegação ativo
const highlightNavItem = () => {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const navItem = document.querySelector(`.nav-link[href="#${section.id}"]`);
        
        if (rect.top <= 100 && rect.bottom >= 100) {
            navItems.forEach(item => item.classList.remove('active'));
            if (navItem) navItem.classList.add('active');
        }
    });
};

window.addEventListener('scroll', highlightNavItem);

// Scroll suave para links âncora
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animação de hover nos cards de projeto
document.querySelectorAll('.projeto-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Animação de hover nos ícones
document.querySelectorAll('.habilidade-icon, .info-icon, .social-link').forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'scale(1.1) rotate(15deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0)';
    });
});

// Animação de progresso das barras de habilidade
const animateProgressBars = () => {
    progressBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = level;
        }, 200);
    });
};

// Inicia a animação das barras quando entrarem na viewport
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateProgressBars();
            progressObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.habilidade-level').forEach(level => {
    progressObserver.observe(level);
});

// Animação dos números nas estatísticas
const animateStats = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const interval = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + '+';
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + '+';
            }
        }, interval);
    });
};

// Animação específica para a seção Sobre
const sobreObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target.querySelector('.sobre-texto');
            const stats = entry.target.querySelectorAll('.stat-item');
            
            text.style.opacity = '1';
            text.style.transform = 'translateY(0)';
            
            stats.forEach((stat, index) => {
                setTimeout(() => {
                    stat.style.opacity = '1';
                    stat.style.transform = 'translateY(0)';
                }, index * 200);
            });
            
            // Anima os números
            animateStats();
            
            sobreObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observa a seção Sobre
const sobreSection = document.querySelector('.sobre');
if (sobreSection) {
    sobreObserver.observe(sobreSection);
}

// Função para buscar projetos do GitHub
async function fetchGitHubProjects() {
    const projetosGrid = document.querySelector('.projetos-grid');
    const projetosExpandidos = document.querySelector('.projetos-grid-expandida');
    if (!projetosGrid || !projetosExpandidos) return;

    try {
        // Mostra o estado de carregamento
        projetosGrid.innerHTML = `
            <div class="loading-projects">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando projetos...</p>
            </div>
        `;

        const response = await fetch('https://api.github.com/users/luizunc/repos');
        if (!response.ok) {
            throw new Error('Erro ao buscar projetos do GitHub');
        }

        const projects = await response.json();
        
        // Mostra apenas 4 projetos inicialmente
        const projetosIniciais = projects.slice(0, 4);
        
        if (projetosIniciais.length === 0) {
            projetosGrid.innerHTML = `
                <div class="error-projects">
                    <i class="fas fa-folder-open"></i>
                    <h3>Nenhum projeto encontrado</h3>
                    <p>Não há projetos públicos no GitHub para exibir.</p>
                </div>
            `;
            return;
        }
        
        // Limpa os grids
        projetosGrid.innerHTML = '';
        projetosExpandidos.innerHTML = '';
        
        // Função para criar um card de projeto
        const criarCardProjeto = (project) => {
            const card = document.createElement('article');
            card.className = 'projeto-card animate-fade-in';
            
            const category = getProjectCategory(project.language);
            
            card.innerHTML = `
                <div class="projeto-img">
                    <img src="https://via.placeholder.com/600x400" alt="${project.name}">
                    <div class="projeto-overlay">
                        <div class="projeto-links">
                            <a href="${project.html_url}" class="projeto-link" target="_blank">
                                <i class="fab fa-github"></i>
                            </a>
                            ${project.homepage ? `
                                <a href="${project.homepage}" class="projeto-link" target="_blank">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
                <div class="projeto-info">
                    <h3>${project.name}</h3>
                    <p>${project.description || 'Projeto sem descrição'}</p>
                    <div class="projeto-tags">
                        <span class="tag">${project.language || 'Vários'}</span>
                        <span class="tag">${category}</span>
                        <span class="tag">${project.stargazers_count} ⭐</span>
                    </div>
                </div>
            `;
            
            return card;
        };
        
        // Adiciona os projetos iniciais
        projetosIniciais.forEach(project => {
            projetosGrid.appendChild(criarCardProjeto(project));
        });
        
        // Adiciona TODOS os projetos na seção expandida
        projects.forEach(project => {
            projetosExpandidos.appendChild(criarCardProjeto(project));
        });
        
        // Observa os cards para animação
        document.querySelectorAll('.projeto-card').forEach(card => {
            observer.observe(card);
        });
        
    } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
        projetosGrid.innerHTML = `
            <div class="error-projects">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Erro ao carregar projetos</h3>
                <p>Não foi possível carregar os projetos do GitHub. Por favor, tente novamente mais tarde.</p>
            </div>
        `;
    }
}

// Função para determinar a categoria do projeto
function getProjectCategory(language) {
    const categories = {
        'JavaScript': 'Web',
        'TypeScript': 'Web',
        'HTML': 'Web',
        'CSS': 'Web',
        'Python': 'Backend',
        'Java': 'Backend',
        'C#': 'Jogos',
        'Unity': 'Jogos',
        'PHP': 'Backend',
        'Ruby': 'Backend'
    };
    
    return categories[language] || 'Outros';
}

// Controle da seção expandida
document.addEventListener('DOMContentLoaded', () => {
    const btnVerMais = document.getElementById('btnVerMais');
    const btnFechar = document.getElementById('btnFechar');
    const projetosExpandidos = document.getElementById('projetosExpandidos');
    
    if (btnVerMais && btnFechar && projetosExpandidos) {
        btnVerMais.addEventListener('click', () => {
            projetosExpandidos.classList.add('active');
            btnVerMais.classList.add('active');
            document.documentElement.classList.add('smooth-scroll');
        });
        
        btnFechar.addEventListener('click', () => {
            projetosExpandidos.classList.remove('active');
            btnVerMais.classList.remove('active');
            document.documentElement.classList.remove('smooth-scroll');
        });

        // Previne o scroll do body quando a seção expandida está aberta
        projetosExpandidos.addEventListener('wheel', (e) => {
            if (projetosExpandidos.scrollTop === 0 && e.deltaY < 0) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    fetchGitHubProjects();
}); 