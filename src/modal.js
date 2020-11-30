export default async function modal() {
    
    const closeModal = document.getElementById('modal');
    
    document.querySelector('#close-modal').addEventListener('click', () => {
        closeModal.classList.add('animate-modal');
        setTimeout(() => {
            closeModal.classList.add("hidden"); 
        }, 1000)
    })

    closeModal.addEventListener('animationend', () => {
        if (this.classList.contains('animate-modal')) {
            this.style.display = 'none';
            this.classList.remove('animate-modal');
        } 
    });
}