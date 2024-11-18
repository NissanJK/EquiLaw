import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

function Blog() {
  const [blogs, setBlogs] = useState([]);

  // Load blogs from localStorage on component mount
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Helmet>
        <title>EquiLaw | Blogs</title>
      </Helmet>
      <h2 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond text-center">Blogs</h2>
      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="card shadow-xl bg-base-100">
              <div className="card-body">
                <h3 className="card-title text-lg md:text-xl lg:text-2xl font-extrabold font-Garamond">{blog.title}</h3>
                <p className="text-gray-500 text-base md:text-lg lg:text-xl">{blog.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-base md:text-lg lg:text-xl">No blog posts available at the moment.</p>
      )}
    </div>
  );
}

export default Blog;
