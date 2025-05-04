let currentPage = 0;
let totalPages = 0;

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    
    document.getElementById('userForm').addEventListener('submit', handleFormSubmit);
    document.getElementById('pageSize').addEventListener('change', () => {
        currentPage = 0;
        loadUsers();
    });
});

async function loadUsers() {
    const pageSize = document.getElementById('pageSize').value;
    try {
        const response = await fetch(`/api/users?page=${currentPage}&size=${pageSize}&sort=name,asc`);
        const data = await response.json();
        displayUsers(data.content);
        updatePagination(data);
    } catch (error) {
        console.error('Error loading users:', error);
        alert('Error loading users');
    }
}

function displayUsers(users) {
    const tbody = document.getElementById('usersTableBody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phoneNumber}</td>
            <td>${user.city || '-'}</td>
            <td>
                <button class="btn btn-sm btn-info" onclick="getWeather(${user.id})">Weather</button>
                <button class="btn btn-sm btn-warning" onclick="editUser(${JSON.stringify(user)})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

function updatePagination(data) {
    totalPages = data.totalPages;
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    
    // Previous button
    const prevBtn = createPaginationButton('Previous', currentPage > 0, () => {
        currentPage--;
        loadUsers();
    });
    pagination.appendChild(prevBtn);
    
    // Page numbers
    for (let i = 0; i < totalPages; i++) {
        const pageBtn = createPaginationButton(i + 1, true, () => {
            currentPage = i;
            loadUsers();
        });
        if (i === currentPage) {
            pageBtn.classList.add('active');
        }
        pagination.appendChild(pageBtn);
    }
    
    // Next button
    const nextBtn = createPaginationButton('Next', currentPage < totalPages - 1, () => {
        currentPage++;
        loadUsers();
    });
    pagination.appendChild(nextBtn);
}

function createPaginationButton(text, enabled, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = `btn btn-outline-primary pagination-btn ${!enabled ? 'disabled' : ''}`;
    if (enabled) {
        button.addEventListener('click', onClick);
    }
    return button;
}

async function handleFormSubmit(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const userData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phoneNumber: document.getElementById('phoneNumber').value,
        city: document.getElementById('city').value
    };

    try {
        const url = userId ? `/api/users/${userId}` : '/api/users';
        const method = userId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData)
        });

        if (response.ok) {
            resetForm();
            loadUsers();
        } else {
            const error = await response.json();
            alert(error.message || 'Error saving user');
        }
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Error saving user');
    }
}

function editUser(user) {
    document.getElementById('userId').value = user.id;
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('phoneNumber').value = user.phoneNumber;
    document.getElementById('city').value = user.city || '';
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }

    try {
        const response = await fetch(`/api/users/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            loadUsers();
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
    }
}

async function getWeather(id) {
    try {
        const response = await fetch(`/api/users/${id}/weather`);
        const data = await response.json();
        
        if (response.ok) {
            alert(`Current weather: ${JSON.stringify(data, null, 2)}`);
        } else {
            alert(data.error || 'Error fetching weather data');
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
        alert('Error fetching weather data');
    }
}

function resetForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
}
