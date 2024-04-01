const delButtonHandler = async event => {
  let target = event.target;
  // Check if the clicked element has the class .btn-danger
  if (!target.classList.contains('btn-danger')) {
    // If not, find the closest parent element with the class .btn-danger
    target = event.target.closest('.btn-danger');
  }

  // If no parent with the class .btn-danger is found, exit
  if (!target) return;

  const id = target.getAttribute('data-id');

  const response = await fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to delete post');
  }
};

document.addEventListener('click', delButtonHandler);
