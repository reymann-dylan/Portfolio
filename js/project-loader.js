document.addEventListener('DOMContentLoaded', () => {
    const pathSegments = window.location.pathname.split('/');
    const fileName = pathSegments[pathSegments.length - 1].replace('.html', '');
    const projectId = document.body.dataset.projectId || fileName;

    const projects = window.PROJECTS_DATA || [];
    const project = projects.find(p => p.id === projectId || p.url.includes(fileName));

    if (project) {
        const progressVal = project.progress !== undefined ? project.progress : 0;

        const progressText = document.getElementById('projectProgressText');
        const progressBar = document.getElementById('projectProgressBar');
        if (progressText) progressText.textContent = `${progressVal}%`;
        if (progressBar) progressBar.style.width = `${progressVal}%`;

        const titleEl = document.getElementById('projectTitle');
        const descEl = document.getElementById('projectDesc');
        const statusBadge = document.getElementById('projectStatusBadge');
        const metricStatus = document.getElementById('metricStatus');
        const metricCategory = document.getElementById('metricCategory');
        const metricAction = document.getElementById('metricAction');

        if (titleEl && project.title) titleEl.textContent = project.title;
        if (descEl && project.desc) descEl.textContent = project.desc;
        if (statusBadge && project.status) statusBadge.textContent = `PROJET | ${project.status}`;
        if (metricStatus && project.status) metricStatus.textContent = project.status;
        if (metricCategory && project.category) metricCategory.textContent = project.category;
        if (metricAction && project.actionText) metricAction.textContent = project.actionText;
    }
});