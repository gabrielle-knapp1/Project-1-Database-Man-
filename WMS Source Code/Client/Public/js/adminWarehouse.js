function addItem(){

        }
       function openModal(id) {
        var modal = document.getElementById("myModal");
        var modalContent = document.getElementById("modalContent");

        // Set the content of the modal (you can customize this)
        modalContent.innerHTML = 'Content for ID ' + id;

        modal.style.display = "block";
    }

    function closeModal() {
        var modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
