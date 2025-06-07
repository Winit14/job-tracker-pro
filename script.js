
document.addEventListener('DOMContentLoaded', () => {
    const jobForm = document.getElementById('jobForm');
    const jobList = document.getElementById('jobList');
    const filterStatus = document.getElementById('filterStatus');

    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    function renderJobs(filter = "All") {
        jobList.innerHTML = '';
        const filteredJobs = filter === "All" ? jobs : jobs.filter(job => job.status === filter);
        filteredJobs.forEach((job, index) => {
            const jobDiv = document.createElement('div');
            jobDiv.className = 'job-item';
            jobDiv.innerHTML = \`
                <strong>\${job.company}</strong> - \${job.position} <br>
                <span>Status: \${job.status}</span><br>
                <small>Notes: \${job.notes}</small>
            \`;
            jobList.appendChild(jobDiv);
        });
    }

    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const company = document.getElementById('company').value;
        const position = document.getElementById('position').value;
        const status = document.getElementById('status').value;
        const notes = document.getElementById('notes').value;

        jobs.push({ company, position, status, notes });
        localStorage.setItem('jobs', JSON.stringify(jobs));
        jobForm.reset();
        renderJobs(filterStatus.value);
    });

    filterStatus.addEventListener('change', () => {
        renderJobs(filterStatus.value);
    });

    renderJobs();
});
