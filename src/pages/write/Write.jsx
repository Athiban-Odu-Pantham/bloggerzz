import React, { useState } from 'react';
import './write.css';

export default function Write() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [posts, setPosts] = useState([]);

  const handleTitleChange = (e) => setTitle(e.target.value);

  const handleContentChange = (e) => setContent(e.target.value);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = { title, content, image };
    
    if (editing) {
      const updatedPosts = [...posts];
      updatedPosts[editIndex] = newPost;
      setPosts(updatedPosts);
      setEditing(false);
      setEditIndex(null);
    } else {
      setPosts([...posts, newPost]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    const postToEdit = posts[index];
    setTitle(postToEdit.title);
    setContent(postToEdit.content);
    setImage(postToEdit.image); 
    setEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedPosts = posts.filter((_, i) => i !== index);
    setPosts(updatedPosts);
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <div className="write">
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            placeholder="Write your story here..."
            className="writeInput writeText"
            value={content}
            onChange={handleContentChange}
          />
        </div>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <span>Add an Image</span>
            <input
              type="file"
              id="fileInput"
              accept=".jpg, .jpeg, .png, .gif"
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </label>
        </div>
        {image && <img src={URL.createObjectURL(image)} alt="Selected" className="selectedImage" />}
        <button type="submit" className="writeSubmit">
          {editing ? 'Update' : 'Publish'}
        </button>
      </form>
      <div className="posts">
        {posts.length === 0 ? (
          <p>No posts available</p>
        ) : (
          posts.map((post, index) => (
            <div className="post" key={index}>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.image && <img src={URL.createObjectURL(post.image)} alt="Post" />}
              <button onClick={() => handleEdit(index)}>Edit</button>
              <button onClick={() => handleDelete(index)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
