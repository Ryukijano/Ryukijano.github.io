// Modern Portfolio JavaScript
class PortfolioApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupLoadingScreen();
    this.setupNavigation();
    this.setupThemeToggle();
    this.setupHeroAnimations();
    this.setupScrollAnimations();
    this.setupSkillsSection();
    this.setupProjectsFilter();
    this.setupContactForm();
    this.setupModal();
    this.setupStatsCounter();
    this.setupTimelineAnimation();
    this.setupSmoothScrolling();
    this.setupPerformanceOptimizations();
  }

  // Loading Screen
  setupLoadingScreen() {
    window.addEventListener('load', () => {
      const loadingScreen = document.getElementById('loading-screen');
      const progress = loadingScreen.querySelector('.loading-progress');
      
      // Animate progress bar
      progress.style.width = '100%';
      
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        document.body.style.overflow = 'visible';
        
        // Remove loading screen from DOM after animation
        setTimeout(() => {
          if (loadingScreen.parentNode) {
            loadingScreen.parentNode.removeChild(loadingScreen);
          }
        }, 500);
      }, 1000);
    });
  }

  // Navigation
  setupNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    // Navbar scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }

      // Hide navbar on scroll down, show on scroll up
      if (scrollTop > lastScrollTop && scrollTop > 200) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop;
    });

    // Active link highlighting
    const updateActiveLink = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollTop = window.pageYOffset + 100;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollTop >= top && scrollTop < top + height) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // Mobile menu toggle
    if (navToggle) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }
  }

  // Theme Toggle
  setupThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle?.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Animate the transition
      document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  // Hero Section Animations
  setupHeroAnimations() {
    const typingText = document.querySelector('.typing-text');
    const roles = document.querySelectorAll('.role');
    
    // Typing animation
    if (typingText) {
      const text = typingText.textContent;
      typingText.textContent = '';
      
      let i = 0;
      const typeWriter = () => {
        if (i < text.length) {
          typingText.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
        }
      };
      
      setTimeout(typeWriter, 500);
    }

    // Role rotation animation
    if (roles.length > 0) {
      let currentRole = 0;
      
      const showRole = (index) => {
        roles.forEach((role, i) => {
          role.classList.remove('active');
          if (i === index) {
            role.classList.add('active');
          }
        });
      };

      setInterval(() => {
        currentRole = (currentRole + 1) % roles.length;
        showRole(currentRole);
      }, 2000);
    }

    // Floating icons animation
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
      icon.style.animationDelay = `${index * 0.5}s`;
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroBackground = document.querySelector('.hero-background');
      
      if (heroBackground && scrolled < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  // Scroll Animations
  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          
          // Animate skill bars when skills section is visible
          if (entry.target.classList.contains('skills')) {
            this.animateSkillBars();
          }
          
          // Animate stats when about section is visible
          if (entry.target.classList.contains('about')) {
            this.animateStats();
          }
        }
      });
    }, observerOptions);

    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => observer.observe(section));

    // Observe timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach(item => observer.observe(item));

    // Observe project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => observer.observe(card));
  }

  // Skills Section
  setupSkillsSection() {
    const skillCategories = document.querySelectorAll('.skill-category');
    const skillGroups = document.querySelectorAll('.skill-group');
    
    skillCategories.forEach(category => {
      category.addEventListener('click', () => {
        const targetCategory = category.getAttribute('data-category');
        
        // Update active category
        skillCategories.forEach(cat => cat.classList.remove('active'));
        category.classList.add('active');
        
        // Show corresponding skill group
        skillGroups.forEach(group => {
          group.classList.add('hidden');
          if (group.getAttribute('data-group') === targetCategory) {
            group.classList.remove('hidden');
            
            // Re-animate skill bars
            setTimeout(() => {
              this.animateSkillBars();
            }, 300);
          }
        });
        
        // Update radar chart
        this.updateRadarChart(targetCategory);
      });
    });

    // Initialize radar chart
    this.initRadarChart();
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-group:not(.hidden) .skill-progress');
    skillBars.forEach((bar, index) => {
      setTimeout(() => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = '0%';
        setTimeout(() => {
          bar.style.width = progress;
        }, 50);
      }, index * 100);
    });
  }

  initRadarChart() {
    const canvas = document.getElementById('skills-chart');
    if (!canvas || !window.Chart) return;

    const ctx = canvas.getContext('2d');
    
    const skillsData = {
      ai: {
        labels: ['PyTorch', 'TensorFlow', 'Computer Vision', 'NLP', 'Deep Learning'],
        data: [95, 90, 92, 85, 93]
      },
      graphics: {
        labels: ['Three.js', 'WebGL', 'CUDA', 'OpenGL', 'Shaders'],
        data: [80, 75, 85, 70, 78]
      },
      quantum: {
        labels: ['Qiskit', 'Quantum Algorithms', 'Quantum ML', 'Quantum Computing', 'Optimization'],
        data: [75, 80, 70, 72, 85]
      },
      dev: {
        labels: ['Python', 'JavaScript', 'C++', 'Git', 'Docker'],
        data: [95, 85, 80, 90, 75]
      }
    };

    this.radarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skillsData.ai.labels,
        datasets: [{
          label: 'Proficiency',
          data: skillsData.ai.data,
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(99, 102, 241, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(99, 102, 241, 1)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            grid: {
              color: 'rgba(99, 102, 241, 0.1)'
            },
            pointLabels: {
              font: {
                size: 12,
                family: 'Inter, sans-serif'
              }
            },
            ticks: {
              display: false
            }
          }
        },
        plugins: {
          legend: {
            display: false
          }
        },
        animation: {
          duration: 1000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

  updateRadarChart(category) {
    if (!this.radarChart) return;

    const skillsData = {
      ai: {
        labels: ['PyTorch', 'TensorFlow', 'Computer Vision', 'NLP', 'Deep Learning'],
        data: [95, 90, 92, 85, 93]
      },
      graphics: {
        labels: ['Three.js', 'WebGL', 'CUDA', 'OpenGL', 'Shaders'],
        data: [80, 75, 85, 70, 78]
      },
      quantum: {
        labels: ['Qiskit', 'Quantum Algorithms', 'Quantum ML', 'Quantum Computing', 'Optimization'],
        data: [75, 80, 70, 72, 85]
      },
      dev: {
        labels: ['Python', 'JavaScript', 'C++', 'Git', 'Docker'],
        data: [95, 85, 80, 90, 75]
      }
    };

    const newData = skillsData[category];
    if (newData) {
      this.radarChart.data.labels = newData.labels;
      this.radarChart.data.datasets[0].data = newData.data;
      this.radarChart.update('active');
    }
  }

  // Projects Filter
  setupProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        projectCards.forEach(card => {
          const categories = card.getAttribute('data-category').split(' ');
          
          if (filter === 'all' || categories.includes(filter)) {
            card.classList.remove('hidden');
            card.style.display = 'block';
          } else {
            card.classList.add('hidden');
            setTimeout(() => {
              if (card.classList.contains('hidden')) {
                card.style.display = 'none';
              }
            }, 300);
          }
        });
      });
    });
  }

  // Contact Form
  setupContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = form?.querySelector('.submit-btn');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      if (!submitBtn) return;
      
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;

      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Show success message
      this.showNotification('Message sent successfully!', 'success');
      form.reset();
      
      submitBtn.classList.remove('loading');
      submitBtn.disabled = false;
    });

    // Floating label animation
    const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    formInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentNode.classList.remove('focused');
        }
      });
      
      // Check if input has value on page load
      if (input.value) {
        input.parentNode.classList.add('focused');
      }
    });
  }

  // Modal System
  setupModal() {
    const modal = document.getElementById('project-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.querySelector('.modal-close');
    const detailButtons = document.querySelectorAll('.project-details-btn');

    const projectDetails = {
      lora: {
        title: 'LoRA Dreambooth - Advanced Image Generation',
        content: `
          <div class="modal-project-details">
            <img src="diffusion.png" alt="LoRA Project" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            
            <h4>Project Overview</h4>
            <p>This project implements LoRA (Low-Rank Adaptation) fine-tuning for Stable Diffusion XL, specifically trained on anime art styles. The model achieves high-quality image generation while maintaining efficiency through parameter-efficient training techniques.</p>
            
            <h4>Key Features</h4>
            <ul>
              <li>Parameter-efficient fine-tuning using LoRA technique</li>
              <li>Multi-style anime art generation capability</li>
              <li>Optimized for SDXL base model architecture</li>
              <li>High-quality outputs with diverse artistic styles</li>
              <li>Easy integration with existing Diffusers pipeline</li>
            </ul>
            
            <h4>Technical Implementation</h4>
            <p>The project utilizes advanced machine learning techniques including:</p>
            <ul>
              <li><strong>LoRA Architecture:</strong> Low-rank adaptation for efficient fine-tuning</li>
              <li><strong>DreamBooth Training:</strong> Personalized image generation</li>
              <li><strong>SDXL Integration:</strong> Built on Stability AI's latest model</li>
              <li><strong>Multi-GPU Training:</strong> Optimized for distributed training</li>
            </ul>
            
            <h4>Results & Impact</h4>
            <p>The model has been downloaded over 1,000 times on Hugging Face and demonstrates significant improvements in anime-style image generation quality and consistency.</p>
            
            <div style="margin-top: 20px;">
              <a href="https://huggingface.co/Ryukijano/lora-trained-xl-kaggle-p100" target="_blank" class="btn btn-primary">
                <i class="fas fa-external-link-alt"></i> View on Hugging Face
              </a>
            </div>
          </div>
        `
      },
      jax: {
        title: 'JAX Diffusers - TPU-Optimized Art Generation',
        content: `
          <div class="modal-project-details">
            <img src="Feature_Github_Hero_Accessibility.jpg" alt="JAX Project" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            
            <h4>Competition Achievement</h4>
            <p>Achieved 8th place globally in the Hugging Face JAX Diffusers community competition, competing against hundreds of participants worldwide. This project demonstrates expertise in cutting-edge AI frameworks and high-performance computing.</p>
            
            <h4>Project Overview</h4>
            <p>Developed an advanced ControlNet model optimized for TPU v4 MXUs using JAX framework. The project focuses on anime-realism art style generation with unprecedented speed and quality.</p>
            
            <h4>Technical Innovations</h4>
            <ul>
              <li>TPU v4 MXU optimization for maximum performance</li>
              <li>JAX framework implementation for XLA compilation</li>
              <li>Custom ControlNet architecture for style control</li>
              <li>Anime-realism hybrid style generation</li>
              <li>Real-time inference capabilities</li>
            </ul>
            
            <h4>Performance Metrics</h4>
            <p>Key achievements and optimizations:</p>
            <ul>
              <li><strong>Speed:</strong> 3x faster inference compared to PyTorch</li>
              <li><strong>Quality:</strong> Superior anime-realism blend quality</li>
              <li><strong>Efficiency:</strong> Optimized memory usage on TPU</li>
              <li><strong>Scalability:</strong> Distributed training capabilities</li>
            </ul>
            
            <h4>Competition Recognition</h4>
            <p>This project was recognized by Google Cloud and Hugging Face teams for its innovative approach to TPU optimization and high-quality results in artistic style transfer.</p>
            
            <div style="margin-top: 20px;">
              <a href="https://github.com/Ryukijano/CatCon-Controlnet-WD-1-5-b2" target="_blank" class="btn btn-primary">
                <i class="fab fa-github"></i> View Source Code
              </a>
            </div>
          </div>
        `
      },
      quantum: {
        title: 'Quantum TSP Solver - Advanced Optimization',
        content: `
          <div class="modal-project-details">
            <img src="command-line__2_.jpg" alt="Quantum TSP" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            
            <h4>Research Contribution</h4>
            <p>This research project contributes to the field of quantum optimization by implementing and comparing Hopfield Neural Networks with Simulated Annealing for solving the Travelling Salesman Problem.</p>
            
            <h4>Problem Statement</h4>
            <p>The Travelling Salesman Problem (TSP) is a classic NP-hard optimization problem. This research explores quantum-inspired approaches to find near-optimal solutions more efficiently than classical methods.</p>
            
            <h4>Methodology</h4>
            <ul>
              <li>Hopfield Neural Network implementation for TSP</li>
              <li>Simulated Annealing optimization technique</li>
              <li>Comparative analysis with classical algorithms</li>
              <li>Performance benchmarking on various problem sizes</li>
              <li>Quantum algorithm simulation and analysis</li>
            </ul>
            
            <h4>Key Findings</h4>
            <p>Research results demonstrate:</p>
            <ul>
              <li><strong>Convergence:</strong> Improved convergence rates with hybrid approach</li>
              <li><strong>Scalability:</strong> Better performance on larger problem instances</li>
              <li><strong>Quality:</strong> Higher quality solutions compared to greedy approaches</li>
              <li><strong>Efficiency:</strong> Reduced computational complexity</li>
            </ul>
            
            <h4>Future Applications</h4>
            <p>The techniques developed in this research have applications in logistics optimization, circuit design, and quantum computing algorithm development.</p>
            
            <div style="margin-top: 20px;">
              <a href="https://arxiv.org/abs/2202.13746" target="_blank" class="btn btn-primary">
                <i class="fas fa-file-alt"></i> Read Full Paper
              </a>
            </div>
          </div>
        `
      },
      portfolio: {
        title: 'Interactive Portfolio - Modern Web Experience',
        content: `
          <div class="modal-project-details">
            <img src="nightcity.jpg" alt="Portfolio" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            
            <h4>Design Philosophy</h4>
            <p>This portfolio represents a modern approach to web development, combining cutting-edge design principles with advanced interactive technologies to create an engaging user experience.</p>
            
            <h4>Technical Features</h4>
            <ul>
              <li>Responsive design with mobile-first approach</li>
              <li>Interactive 3D background using Three.js</li>
              <li>Smooth scrolling and animations</li>
              <li>Dark/light theme switching</li>
              <li>Performance-optimized loading</li>
            </ul>
            
            <h4>Technologies Used</h4>
            <p>Built with modern web technologies:</p>
            <ul>
              <li><strong>Frontend:</strong> HTML5, CSS3, JavaScript ES6+</li>
              <li><strong>Graphics:</strong> Three.js, WebGL, CSS animations</li>
              <li><strong>Design:</strong> CSS Grid, Flexbox, Custom properties</li>
              <li><strong>Performance:</strong> Intersection Observer, lazy loading</li>
              <li><strong>Accessibility:</strong> WCAG compliant, keyboard navigation</li>
            </ul>
            
            <h4>Performance Metrics</h4>
            <ul>
              <li><strong>Lighthouse Score:</strong> 95+ across all categories</li>
              <li><strong>Loading Time:</strong> Sub-2 second first contentful paint</li>
              <li><strong>Responsiveness:</strong> Optimized for all device sizes</li>
              <li><strong>Accessibility:</strong> Full keyboard and screen reader support</li>
            </ul>
            
            <h4>User Experience</h4>
            <p>The portfolio focuses on storytelling through interactive elements, smooth animations, and intuitive navigation to create a memorable experience for visitors.</p>
          </div>
        `
      },
      rl: {
        title: 'Reinforcement Learning Game Agent',
        content: `
          <div class="modal-project-details">
            <img src="doom_ppo.gif" alt="RL Agent" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            
            <h4>Project Overview</h4>
            <p>This project implements a sophisticated reinforcement learning agent trained using Proximal Policy Optimization (PPO) to play classic video games, demonstrating advanced AI decision-making in complex environments.</p>
            
            <h4>Technical Implementation</h4>
            <ul>
              <li>PPO (Proximal Policy Optimization) algorithm</li>
              <li>Custom neural network architecture</li>
              <li>OpenAI Gym environment integration</li>
              <li>Advanced reward shaping techniques</li>
              <li>Multi-environment training pipeline</li>
            </ul>
            
            <h4>Key Achievements</h4>
            <p>The agent demonstrates:</p>
            <ul>
              <li><strong>Learning Speed:</strong> Rapid skill acquisition in game environments</li>
              <li><strong>Generalization:</strong> Ability to adapt to new game scenarios</li>
              <li><strong>Performance:</strong> Human-level or superhuman performance</li>
              <li><strong>Stability:</strong> Consistent performance across training runs</li>
            </ul>
            
            <h4>Research Applications</h4>
            <p>This work contributes to research in:</p>
            <ul>
              <li>Game AI and procedural content generation</li>
              <li>Multi-agent reinforcement learning</li>
              <li>Transfer learning in RL environments</li>
              <li>Real-world robotics applications</li>
            </ul>
            
            <h4>Future Developments</h4>
            <p>Planned enhancements include multi-agent scenarios, real-world robotics integration, and advanced exploration strategies.</p>
          </div>
        `
      }
    };

    detailButtons.forEach(button => {
      button.addEventListener('click', () => {
        const projectId = button.getAttribute('data-project');
        const details = projectDetails[projectId];
        
        if (details) {
          modalTitle.textContent = details.title;
          modalContent.innerHTML = details.content;
          modal.classList.add('show');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    modalClose?.addEventListener('click', () => {
      modal.classList.remove('show');
      document.body.style.overflow = 'visible';
    });

    modal?.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'visible';
      }
    });
  }

  // Stats Counter Animation
  animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const increment = target / 50;
      let current = 0;
      
      const updateCounter = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          setTimeout(updateCounter, 40);
        } else {
          stat.textContent = target;
        }
      };
      
      updateCounter();
    });
  }

  // Timeline Animation
  setupTimelineAnimation() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
          }, index * 200);
        }
      });
    }, { threshold: 0.3 });

    timelineItems.forEach(item => observer.observe(item));
  }

  // Smooth Scrolling
  setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Performance Optimizations
  setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    }

    // Debounce scroll events
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Scroll handling code here
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Preload critical resources
    const preloadLinks = [
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];

    preloadLinks.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'style';
      link.href = href;
      document.head.appendChild(link);
    });
  }

  // Utility function to show notifications
  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close">&times;</button>
      </div>
    `;
    
    // Add notification styles if not present
    if (!document.querySelector('#notification-styles')) {
      const styles = document.createElement('style');
      styles.id = 'notification-styles';
      styles.textContent = `
        .notification {
          position: fixed;
          top: 20px;
          right: 20px;
          padding: 15px 20px;
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          z-index: 10000;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease;
          max-width: 300px;
        }
        
        .notification.show {
          opacity: 1;
          transform: translateX(0);
        }
        
        .notification-success {
          border-left: 4px solid #10b981;
        }
        
        .notification-error {
          border-left: 4px solid #ef4444;
        }
        
        .notification-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .notification-close {
          background: none;
          border: none;
          font-size: 18px;
          cursor: pointer;
          color: #6b7280;
          margin-left: 10px;
        }
      `;
      document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 4000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    });
  }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PortfolioApp();
});

// Add some additional utility functions
window.portfolioUtils = {
  // Smooth scroll to element
  scrollTo: (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  },
  
  // Theme toggle
  toggleTheme: () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  },
  
  // Download resume
  downloadResume: () => {
    // This would typically trigger a download of the resume PDF
    window.open('/resumes/updated_resume.pdf', '_blank');
  }
};

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  // ESC key closes modal
  if (e.key === 'Escape') {
    const modal = document.getElementById('project-modal');
    if (modal && modal.classList.contains('show')) {
      modal.classList.remove('show');
      document.body.style.overflow = 'visible';
    }
  }
  
  // Arrow keys for navigation
  if (e.ctrlKey || e.metaKey) {
    switch(e.key) {
      case 'ArrowUp':
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case 'ArrowDown':
        e.preventDefault();
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        break;
    }
  }
});

// Service Worker registration for PWA capabilities
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}