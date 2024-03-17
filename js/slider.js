document.addEventListener('DOMContentLoaded', function() {
    const reviewsData = document.querySelector('.reviews-data');
    const slide = document.querySelector('.slide');
    const reviewItems = reviewsData.querySelectorAll('.review');
    const sliderControls = document.querySelector('.slider-controls');
    const sliderIndicators = document.querySelector('.slider-controls__indicators');

    let updateReviews = Array.from(reviewItems);
    let currentSlide = 0;

    function fillSlides(reviews) {
        sliderControls.style.display = 'flex';
        sliderIndicators.innerHTML = '';

        reviews.forEach((review, index) => {
            const newIndicator = document.createElement('div');
            newIndicator.classList.add('slider-controls__indicator');

            if (index === currentSlide) {
                newIndicator.classList.add('active');
            }

            sliderIndicators.appendChild(newIndicator);
        });

        updateSlideContent(currentSlide);
    }

    function updateSlideContent(index) {
        const currentReview = updateReviews[index];

        const name = currentReview.querySelector('.review-name').textContent;
        const profession = currentReview.querySelector('.review-profession').textContent;
        const text = currentReview.querySelector('.review-text').textContent;
        const fotoSrc = currentReview.querySelector('.review-foto').src;

        const currentSlideContent = slide.querySelector('.slide__content');
        currentSlideContent.querySelector('.slide__name').textContent = name;
        currentSlideContent.querySelector('.slide__profession').textContent = profession;
        currentSlideContent.querySelector('.slide__text').textContent = text;
        currentSlideContent.querySelector('.slide__avatar img').src = fotoSrc;
    }

    function nextSlide() {
        if (currentSlide < reviewItems.length - 1) {
            currentSlide += 1;
        } else {
            currentSlide = 0;
        };

        fillSlides(updateReviews);
        updateSlideContent(currentSlide);
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide -= 1;
        } else {
            currentSlide = reviewItems.length - 1;
        };

        fillSlides(updateReviews);
        updateSlideContent(currentSlide);
    }

    document.querySelector('.slide-right').addEventListener('click', nextSlide);
    document.querySelector('.slide-left').addEventListener('click', prevSlide);

    fillSlides(updateReviews);
});