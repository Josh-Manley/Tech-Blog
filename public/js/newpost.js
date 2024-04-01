const newFormHandler = async event => {
  event.preventDefault();

  const title = document.querySelector('#post-name').value.trim();

  const text = document.querySelector('#post-desc').value.trim();

  if (title && text) {
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({ title, text }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create post');
    }
  }
};

document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);