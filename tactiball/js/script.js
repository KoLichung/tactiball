// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const header = document.querySelector('header');

    // Testimonials
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    const testimonials = document.querySelectorAll('.testimonial-card');

    // Sticky Header
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'white';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Mobile Navigation Toggle
    if (burger) {
        burger.addEventListener('click', function() {
            // Toggle Nav
            nav.classList.toggle('active');
            
            // Burger Animation
            burger.classList.toggle('toggle');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });
    }

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                if (burger) {
                    burger.classList.remove('toggle');
                }
            }
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentTestimonial = index;
    }

    // Initialize first testimonial
    showTestimonial(0);

    // Previous testimonial button
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Next testimonial button
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        });
    }

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showTestimonial(index);
        });
    });

    // Auto-advance testimonials every 5 seconds
    setInterval(function() {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize AOS Animation Library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Basketball Court Animation
    initializeCourtAnimation();
});

// Basketball Court Animation
function initializeCourtAnimation() {
    // 確保籃球場元素存在
    const court = document.querySelector('.court');
    if (!court) return;

    // 球員和球的元素已經在HTML中定義，動畫通過CSS控制
    // 這裡可以添加額外的互動功能

    // 例如：點擊籃球場時暫停/恢復動畫
    court.addEventListener('click', function() {
        const players = document.querySelectorAll('.player');
        const ball = document.querySelector('.ball');
        
        players.forEach(player => {
            if (player.style.animationPlayState === 'paused') {
                player.style.animationPlayState = 'running';
            } else {
                player.style.animationPlayState = 'paused';
            }
        });
        
        if (ball) {
            if (ball.style.animationPlayState === 'paused') {
                ball.style.animationPlayState = 'running';
            } else {
                ball.style.animationPlayState = 'paused';
            }
        }
    });

    // 添加滑鼠懸停效果
    court.addEventListener('mouseenter', function() {
        court.style.transform = 'scale(1.02)';
        court.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)';
    });

    court.addEventListener('mouseleave', function() {
        court.style.transform = 'scale(1)';
        court.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
    });
}

// 當視窗大小改變時，重新調整元素
window.addEventListener('resize', function() {
    // 這裡可以添加響應式調整的代碼
});

// 頁面載入完成後的動畫效果
window.addEventListener('load', function() {
    // 移除預載入畫面（如果有的話）
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }

    // 添加頁面載入動畫
    const fadeElements = document.querySelectorAll('.animate-fade-in');
    fadeElements.forEach(element => {
        element.style.opacity = '1';
    });
}); 