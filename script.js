// Adding click animations 
document.querySelectorAll('img').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.parentNode.classList.add('click');
        setTimeout(() => e.target.parentNode.classList.remove('click'), 100);
    })
})
document.querySelectorAll('.grid-item').forEach((btn) => {
    btn.addEventListener('click', (e) => {
        e.target.classList.add('click');
        setTimeout(() => e.target.classList.remove('click'), 100);
    })
})

