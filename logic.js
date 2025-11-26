// Đợi DOM load xong mới chạy code
document.addEventListener('DOMContentLoaded', function() {
    // Mảng ảnh cho iOS (7 ảnh)
    const stepsIOS = [
        {src: "images/b1.webp", alt: "Bước 1"},
        {src: "images/b2.webp", alt: "Bước 2"},
        {src: "images/b3.webp", alt: "Bước 3"},
        {src: "images/b4.webp", alt: "Bước 4"},
        {src: "images/b5.webp", alt: "Bước 5"},
        {src: "images/b6.webp", alt: "Bước 6"},
        {src: "images/b7.webp", alt: "Bước 7"}
    ];

    // Mảng ảnh cho Android (5 ảnh)
    const stepsAndroid = [
        {src: "images/b1-andr.webp", alt: "Bước 1 Android"},
        {src: "images/b2-andr.webp", alt: "Bước 2 Android"},
        {src: "images/b3-andr.webp", alt: "Bước 3 Android"},
        {src: "images/b4-andr.webp", alt: "Bước 4 Android"},
        {src: "images/b5-andr.webp", alt: "Bước 5 Android"}
    ];

    // Function tổng quát để khởi tạo slider độc lập
    function initSlider(sliderId, leftArrowId, rightArrowId, steps, mobileLeftArrowId = null, mobileRightArrowId = null) {
        let current = 0;
        
        function getItemsPerPage() {
            return window.innerWidth < 1024 ? 2 : 4;
        }

        function updateSlider() {
            const slider = document.getElementById(sliderId);
            if (!slider) return;
            
            const itemsPerPage = getItemsPerPage();
            const isMobile = window.innerWidth < 1024;
            const isMobileSlider = sliderId.includes('-mobile');
            
            slider.innerHTML = '';
            for (let i = current; i < current + itemsPerPage && i < steps.length; i++) {
                const img = document.createElement('img');
                img.src = steps[i].src;
                img.alt = steps[i].alt;
                img.className = "rounded-lg object-contain";
                if (isMobileSlider) {
                    // Mobile: 2 ảnh chia đều, mỗi ảnh chiếm ~50% width
                    img.style.width = 'calc(50% - 4px)';
                    img.style.flex = '0 0 calc(50% - 4px)';
                } else {
                    img.style.width = '100%';
                    img.style.maxWidth = isMobile ? '160px' : '255px';
                    img.style.flex = '1 1 0%';
                }
                slider.appendChild(img);
            }
        }

        function handleArrowClick(direction) {
            const itemsPerPage = getItemsPerPage();
            if (direction === 'left' && current > 0) {
                current--;
                updateSlider();
            } else if (direction === 'right' && current < steps.length - itemsPerPage) {
                current++;
                updateSlider();
            }
        }

        // Desktop arrows
        const leftArrow = document.getElementById(leftArrowId);
        const rightArrow = document.getElementById(rightArrowId);

        if (leftArrow) {
            leftArrow.addEventListener('click', () => handleArrowClick('left'));
        }

        if (rightArrow) {
            rightArrow.addEventListener('click', () => handleArrowClick('right'));
        }

        // Mobile arrows (đảo ngược logic: arrow trái = chuyển sang phải, arrow phải = chuyển sang trái)
        if (mobileLeftArrowId) {
            const mobileLeftArrow = document.getElementById(mobileLeftArrowId);
            if (mobileLeftArrow) {
                mobileLeftArrow.addEventListener('click', () => handleArrowClick('right'));
            }
        }

        if (mobileRightArrowId) {
            const mobileRightArrow = document.getElementById(mobileRightArrowId);
            if (mobileRightArrow) {
                mobileRightArrow.addEventListener('click', () => handleArrowClick('left'));
            }
        }

        // Update on resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                current = 0; // Reset to first page on resize
                updateSlider();
            }, 250);
        });

        // Khởi tạo slider
        updateSlider();
    }

    // Khởi tạo slider iOS (slider đầu tiên) - 7 ảnh
    initSlider('steps-slider', 'left-arrow', 'right-arrow', stepsIOS, 'left-arrow-mobile', 'right-arrow-mobile');
    
    // Khởi tạo slider iOS cho mobile (nếu có)
    if (document.getElementById('steps-slider-mobile')) {
        initSlider('steps-slider-mobile', null, null, stepsIOS, 'left-arrow-mobile-ios', 'right-arrow-mobile-ios');
    }

    // Khởi tạo slider Android (slider thứ hai) - 5 ảnh, hoạt động độc lập
    initSlider('steps-slider-2', 'left-arrow-2', 'right-arrow-2', stepsAndroid, 'left-arrow-2-mobile', 'right-arrow-2-mobile');
    
    // Khởi tạo slider Android cho mobile (nếu có)
    if (document.getElementById('steps-slider-2-mobile')) {
        initSlider('steps-slider-2-mobile', null, null, stepsAndroid, 'left-arrow-mobile-android', 'right-arrow-mobile-android');
    }
});