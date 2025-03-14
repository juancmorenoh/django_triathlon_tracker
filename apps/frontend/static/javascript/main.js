function showDisciplineForm(container){
    container.classList.add('active');
}


document.querySelectorAll('.actual-form').forEach(form => {
    form.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevents the click event from reaching the parent
    });
});

