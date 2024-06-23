document.addEventListener('DOMContentLoaded', function() {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        console.log(packageDetails); 
   
        const packageDetailsContainer = document.getElementById('packageDetailsContainer');

        packageDetailsContainer.innerHTML = `
            <h2>${packageDetails.name}</h2>
            <p>${packageDetails.description}</p>
            <p>Version: ${packageDetails.version}</p>
            <p>Author: ${packageDetails.author ? packageDetails.author.name : 'N/A'}</p>
            <p>Repository: <a href="${packageDetails.links.repository}" target="_blank">${packageDetails.links.repository}</a></p>
            <p>Homepage: <a href="${packageDetails.links.homepage}" target="_blank">${packageDetails.links.homepage}</a></p>
        `;

        localStorage.removeItem('selectedPackage');
    }

    let backButton = document.querySelector('.bi-arrow-left-circle');
    backButton.addEventListener('click', function() {
        window.location.href = 'popup.html';
    });
});
