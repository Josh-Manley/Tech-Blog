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

const delCommentButtonHandler = async event => {
  let target = event.target;

  // Check if the clicked element has the class .btn-danger2
  if (!target.classList.contains('btn-danger2')) {
    // If not, find the closest parent element with the class .btn-danger2
    target = event.target.closest('.btn-danger2');
  }

  // If no parent with the class .btn-danger2 is found, exit
  if (!target) return;

  const commentId = target.getAttribute('data-id');

  console.log('Comment ID:', commentId); // Debugging: Check if commentId is retrieved correctly

  const response = await fetch(`/api/comments/${commentId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    // Remove the deleted comment from the DOM
    target.parentElement.remove();
    document.location.replace(`/api/comments/${commentId}`);
  } else {
    alert('Failed to delete comment');
  }
};

document.addEventListener('click', delCommentButtonHandler);
document.addEventListener('click', delButtonHandler);
