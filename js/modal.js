import { buildModal } from "./ui.js";

  const modal = document.getElementById("issueModal");
  const modalContent = document.getElementById("modalContent");

  export function showIssueModal(issue) {
    modalContent.innerHTML = buildModal(issue);
    modal.showModal();
  }

  export function closeIssueModal() {
    modal.close();
  }

  // Close modal on backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.close();
    }
  });
  