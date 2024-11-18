import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function BlogManager() {
    const [blogs, setBlogs] = useState([]);
    const [newBlogTitle, setNewBlogTitle] = useState('');
    const [newBlogContent, setNewBlogContent] = useState('');
    const [editBlogId, setEditBlogId] = useState(null);
    const [editBlogTitle, setEditBlogTitle] = useState('');
    const [editBlogContent, setEditBlogContent] = useState('');
    const navigate = useNavigate();

    // Load blogs from localStorage on component mount
    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs);
    }, []);

    // Save blogs to localStorage whenever blogs state updates
    useEffect(() => {
        localStorage.setItem('blogs', JSON.stringify(blogs));
    }, [blogs]);

    const handleAddBlog = () => {
        if (newBlogTitle.trim() && newBlogContent.trim()) {
            const newBlogItem = { id: Date.now(), title: newBlogTitle, content: newBlogContent };
            setBlogs([...blogs, newBlogItem]);
            setNewBlogTitle('');
            setNewBlogContent('');
        }
    };

    const handleDeleteBlog = (id) => {
        const updatedBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(updatedBlogs);
    };

    const handleEditBlog = (blog) => {
        setEditBlogId(blog.id);
        setEditBlogTitle(blog.title);
        setEditBlogContent(blog.content);
    };

    const handleUpdateBlog = () => {
        const updatedBlogs = blogs.map((blog) =>
            blog.id === editBlogId ? { ...blog, title: editBlogTitle, content: editBlogContent } : blog
        );
        setBlogs(updatedBlogs);
        setEditBlogId(null);
        setEditBlogTitle('');
        setEditBlogContent('');
    };
    const handleBack = () => {
        navigate(-1); // Navigate to the previous page in the history stack
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <Helmet>
                <title>EquiLaw | Blog Manager</title>
            </Helmet>
            <button
                className="btn btn-circle mb-4 text-4xl"
                onClick={handleBack} // Add functionality to go back
            >
                <IoArrowBackCircleOutline />
            </button>
            <h2 className="text-3xl font-bold text-center text-primary mb-8">Manage Blogs</h2>

            {/* Add New Blog */}
            <div className="card shadow-lg bg-base-100 p-6 mb-8">
                <input
                    type="text"
                    className="input input-bordered w-full mb-4"
                    placeholder="Blog title"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                />
                <textarea
                    className="textarea textarea-bordered w-full mb-4"
                    placeholder="Blog content"
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                ></textarea>
                <button className="btn btn-primary w-full" onClick={handleAddBlog}>Add Blog</button>
            </div>

            {/* Blog List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.id} className="card shadow-lg bg-base-100 p-4">
                        <div className="card-body">
                            {editBlogId === blog.id ? (
                                <>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        placeholder="Edit title"
                                        value={editBlogTitle}
                                        onChange={(e) => setEditBlogTitle(e.target.value)}
                                    />
                                    <textarea
                                        className="textarea textarea-bordered w-full mb-4"
                                        placeholder="Edit content"
                                        value={editBlogContent}
                                        onChange={(e) => setEditBlogContent(e.target.value)}
                                    ></textarea>
                                    <div className="flex space-x-4">
                                        <button className="btn btn-primary" onClick={handleUpdateBlog}>Update</button>
                                        <button className="btn btn-outline" onClick={() => setEditBlogId(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="card-title text-primary">{blog.title}</h3>
                                    <p>{blog.content}</p>
                                    <div className="flex space-x-4 mt-4">
                                        <button className="btn btn-secondary" onClick={() => handleEditBlog(blog)}>Edit</button>
                                        <button className="btn btn-error" onClick={() => handleDeleteBlog(blog.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BlogManager;
