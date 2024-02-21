import React, { useState, useEffect } from 'react';
import './css/UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const usersResponse = await fetch('https://jsonplaceholder.typicode.com/users');
                const usersData = await usersResponse.json();
                const usersWithTodosCount = await Promise.all(usersData.map(async user => {
                    const todosResponse = await fetch(`https://jsonplaceholder.typicode.com/todos?userId=${user.id}`);
                    const todosData = await todosResponse.json();
                    const totalTodos = todosData.length;
                    const todosUncompleted = todosData.filter(todo => !todo.completed).length;
                    const todosCount = totalTodos - todosUncompleted;

                    const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${user.id}`);
                    const albumsData = await albumsResponse.json();
                    const albumsCount = albumsData.length;

                    return { ...user, todosCount, albumsCount };
                }));
                setUsers(usersWithTodosCount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="user-list-container">
            <h2>User List Page</h2>
            <table className="user-list-table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Company</th>
                        <th># Todos</th>
                        <th># Albums</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="username"><a href={`/user/${user.id}`}>{user.username}</a></td>
                            <td className="email">{user.email}</td>
                            <td className="website"><a href={user.website} target="_blank" rel="noopener noreferrer">{user.website}</a></td>
                            <td className="company">{user.company.name}</td>
                            <td className="todos-count">{user.todosCount}</td>
                            <td className="albums-count">{user.albumsCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
