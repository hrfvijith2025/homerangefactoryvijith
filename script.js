document.addEventListener('DOMContentLoaded', () => {
    const idCardForm = document.getElementById('idCardForm');
    const staffPhotoInput = document.getElementById('photo');
    const downloadBtn = document.getElementById('downloadBtn');
    const idCardDisplay = document.getElementById('idCardDisplay');

    idCardForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;

        // Display details on the card
        document.getElementById('cardName').textContent = name;
        document.getElementById('cardAddress').textContent = address;
        document.getElementById('cardPhone').textContent = phone;

        // Handle photo upload
        const file = staffPhotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById('staffPhoto').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }

        // Show the ID card and download button
        idCardDisplay.style.display = 'block';
        downloadBtn.style.display = 'block';
    });

    downloadBtn.addEventListener('click', () => {
        // html2canvas converts the ID card div to an image
        html2canvas(idCardDisplay, {
            scale: 2, // Improves resolution for a crisper image on mobile
            useCORS: true
        }).then(canvas => {
            const link = document.createElement('a');
            link.download = 'ID-Card.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        });
    });
});