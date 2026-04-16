document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');

    if (dropZone && fileInput) {
        // Open file dialog when drop zone is clicked
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        // Add visual indicator when dragging over
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault(); // Prevent default browser behavior
            dropZone.classList.add('drag-over');
        });

        // Remove visual indicator when dragging leaves
        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        // Handle the dropped file
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault(); // Prevent default browser behavior
            dropZone.classList.remove('drag-over');

            const files = e.dataTransfer.files;
            if (files.length > 0) {
                // We only care about the first file if multiple are dropped
                const file = files[0];

                // Check if the file is a PDF
                if (file.type === 'application/pdf') {
                    fileInput.files = files; // Assign the dropped file to the input

                    // Update the drop zone text to show the file name
                    const dropZoneText = dropZone.querySelector('p');
                    dropZoneText.textContent = file.name;
                    dropZone.querySelector('span').textContent = 'PDF selected. Click to change.';
                } else {
                    alert('Please drop a PDF file only.');
                }
            }
        });

        // Handle file selection via the file dialog
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                const file = fileInput.files[0];
                const dropZoneText = dropZone.querySelector('p');
                dropZoneText.textContent = file.name;
                dropZone.querySelector('span').textContent = 'PDF selected. Click to change.';
            }
        });
    }
});
