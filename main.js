window.copyToClipboard = async function(text) {
    console.log(text);
    try {
        await navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const packageDetails = JSON.parse(localStorage.getItem('selectedPackage'));

    if (packageDetails) {
        console.log(packageDetails);
        fetch(`https://www.npmjs.com/package/${packageDetails}`, {
            headers: {
                'x-spiferack': '1',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                const packageDetailsContainer = document.getElementById('packageDetailsContainer');

                packageDetailsContainer.innerHTML = `
                   ${data?.readme?.data}
                `;
                // displayPackageDetails(packageDetails);
            })
            .catch(error => {
                console.error('There was a problem fetching package details:', error);
            });



        localStorage.removeItem('selectedPackage');
    }

    let backButton = document.querySelector('.bi-arrow-left-circle');
    backButton.addEventListener('click', function() {
        window.location.href = 'popup.html';
    });
});
