
document.addEventListener("DOMContentLoaded", function() {
    const videosBtn = document.getElementById("videos-btn");
    const commentsBtn = document.getElementById("comments-btn");
    const videosContainer = document.querySelector(".videos");
    const commentsContainer = document.querySelector(".comments");

    videosBtn.addEventListener("click", function() {
        videosContainer.style.display = "block";
        commentsContainer.style.display = "none";
    });

    commentsBtn.addEventListener("click", function() {
        videosContainer.style.display = "none";
        commentsContainer.style.display = "block";
    });
});