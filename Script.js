
const classIdInput = document.getElementById('class-id');
const classIdSubmit = document.getElementById('class-id-submit');
const linkInput = document.getElementById('link-input');
const addLink = document.getElementById('add-link');
const linksList = document.getElementById('links-list');
let classId = '';
let objectArray = JSON.parse(localStorage.getItem('objectArray')) || [];
const dis = document.querySelector('#todo-links-list');


classIdSubmit.addEventListener('click', () => {
    classId = classIdInput.value.trim();
    if (classId) {
        displayLinks();
    }
});


addLink.addEventListener('click', () => {
    const link = linkInput.value.trim();
    if (classId && link) {
        addLinkToObjectArray(classId, link);
        displayLinks();
        linkInput.value = ''; 
    }
});


function addLinkToObjectArray(classId, link) {
    let classObj = objectArray.find(item => item.classid === classId);

    if (classObj) {
        classObj.link.push(link);
    } else {
        objectArray.push({ classid: classId, link: [link] });
    }

    localStorage.setItem('objectArray', JSON.stringify(objectArray));
}


function displayLinks() {
    
    dis.innerHTML = '';

    
    const classObj = objectArray.find(item => item.classid === classId);

    
    if (classObj) {
        classObj.link.forEach((link, index) => {
            dis.innerHTML += `
            <div class="link-item">
                <p>${link}</p>
                <div>
                    <img src='rate.png' alt='Rate' />
                    <img src='delete.png' alt='Delete' class='delete-link' data-index='${index}' />
                </div>
            </div>
            `;
        });

        const deleteButtons = document.querySelectorAll('.delete-link');
        deleteButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const linkIndex = event.target.getAttribute('data-index');
                removeLinkFromObjectArray(linkIndex);
            });
        });
    }
    
    document.getElementById('show-id').innerHTML = classId;    
}

function removeLinkFromObjectArray(linkIndex) {
    
    const classObj = objectArray.find(item => item.classid === classId);

    if (classObj) {
        
        classObj.link.splice(linkIndex, 1);
        
        localStorage.setItem('objectArray', JSON.stringify(objectArray));
        
        displayLinks();
    }
}
