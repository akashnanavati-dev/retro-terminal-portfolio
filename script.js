/**
 * Terminal Portfolio Website
 * A retro terminal-style portfolio website with interactive commands
 * and visual effects.
 */

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const terminalOutput = document.getElementById('terminal-output');
    const terminalInput = document.getElementById('terminal-input');
    const asciiHeader = document.getElementById('ascii-header');
    const easterEggModal = document.getElementById('easter-egg-modal');
    const easterEggContent = document.getElementById('easter-egg-content');
    const closeModal = document.querySelector('.close-modal');
    const cursor = document.querySelector('.cursor');
    const terminalPrompt = document.querySelector('.terminal-prompt');
    
    // ASCII Art for Akash Nanavati
    const akashAscii = `
     █████╗ ██╗  ██╗ █████╗ ███████╗██╗  ██╗    ███╗   ██╗ █████╗ ███╗   ██╗ █████╗ ██╗   ██╗ █████╗ ████████╗██╗
    ██╔══██╗██║ ██╔╝██╔══██╗██╔════╝██║  ██║    ████╗  ██║██╔══██╗████╗  ██║██╔══██╗██║   ██║██╔══██╗╚══██╔══╝██║
    ███████║█████╔╝ ███████║███████╗███████║    ██╔██╗ ██║███████║██╔██╗ ██║███████║██║   ██║███████║   ██║   ██║
    ██╔══██║██╔═██╗ ██╔══██║╚════██║██╔══██║    ██║╚██╗██║██╔══██║██║╚██╗██║██╔══██║╚██╗ ██╔╝██╔══██║   ██║   ██║
    ██║  ██║██║  ██╗██║  ██║███████║██║  ██║    ██║ ╚████║██║  ██║██║ ╚████║██║  ██║ ╚████╔╝ ██║  ██║   ██║   ██║
    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝    ╚═╝  ╚═══╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ╚═══╝  ╚═╝  ╚═╝   ╚═╝   ╚═╝
                                                                                                                   
    `;
    
    /**
     * Displays the ASCII art header in the terminal
     * Shows the name "AKASH NANAVATI" in ASCII art format
     */
    function displayAsciiArt() {
        asciiHeader.textContent = akashAscii;
    }
    
    /**
     * Initializes the terminal interface
     * Sets up the ASCII art header, cursor positioning, event listeners,
     * mobile command buttons (if on small screen), and matrix background effect
     */
    function initTerminal() {
        displayAsciiArt();
        terminalInput.focus();
        
        // Position cursor at the prompt initially
        updateCursorPosition();
        
        // Add event listeners for cursor movement
        terminalInput.addEventListener('input', updateCursorPosition);
        terminalInput.addEventListener('keydown', function(e) {
            // Small delay to update cursor after key processing
            setTimeout(updateCursorPosition, 10);
        });
        
        // Add mobile command buttons if on small screen
        if (window.innerWidth <= 768) {
            createMobileCommandButtons();
        }
        
        // Create matrix background effect
        createMatrixBackground();
    }
    
    /**
     * Updates the cursor position based on the current input text
     * Calculates the position by combining prompt width and text width
     */
    function updateCursorPosition() {
        const promptWidth = terminalPrompt.getBoundingClientRect().width;
        const textWidth = getTextWidth(terminalInput.value);
        cursor.style.left = (promptWidth + textWidth + 8) + 'px'; // 8px is the margin-right of prompt
    }
    
    /**
     * Helper function to calculate text width in pixels
     * Uses canvas to measure text width with the current font
     * @param {string} text - The text to measure
     * @return {number} The width of the text in pixels
     */
    function getTextWidth(text) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.font = getComputedStyle(terminalInput).font;
        return context.measureText(text).width;
    }
    
    /**
     * Creates mobile-friendly command buttons for small screens
     * Adds clickable buttons for common commands to improve mobile usability
     */
    function createMobileCommandButtons() {
        const commands = ['help', 'about', 'projects', 'skills', './run --profile', 'cat skills.txt', 'ls projects/', 'git log --oneline'];
        const mobileCommands = document.createElement('div');
        mobileCommands.className = 'mobile-commands';
        
        commands.forEach(cmd => {
            const button = document.createElement('button');
            button.className = 'command-button';
            button.textContent = cmd;
            button.addEventListener('click', () => {
                terminalInput.value = cmd;
                processCommand();
            });
            mobileCommands.appendChild(button);
        });
        
        terminalOutput.parentNode.insertBefore(mobileCommands, terminalOutput.nextSibling);
    }
    
    /**
     * Creates the Matrix-style background effect
     * Adds a canvas with falling Japanese characters and numbers
     * for a cyberpunk aesthetic
     */
    function createMatrixBackground() {
        const canvas = document.createElement('canvas');
        canvas.className = 'matrix-bg';
        document.body.appendChild(canvas);
        
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = canvas.width / 20;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        /**
         * Draws a single frame of the Matrix effect
         * Creates the falling character animation by drawing characters
         * and managing their vertical positions
         */
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0f0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        setInterval(drawMatrix, 50);
    }
    
    /**
     * Creates a typewriter effect for text
     * Displays text character by character for a retro terminal feel
     * @param {HTMLElement} element - The element to add text to
     * @param {string} text - The text to display
     * @param {number} speed - The speed of typing in milliseconds
     * @return {Promise} Resolves when typing is complete
     */
    function typeWriter(element, text, speed = 30) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
        return new Promise(resolve => setTimeout(resolve, text.length * speed + 100));
    }
    
    /**
     * Adds output text to the terminal with optional styling
     * Uses typewriter effect and auto-scrolls to the bottom
     * @param {string} text - The text to display
     * @param {string} className - Optional CSS class for styling
     */
    function addOutput(text, className = '') {
        const output = document.createElement('p');
        if (className) output.className = className;
        terminalOutput.appendChild(output);
        
        // Use typewriter effect for text
        typeWriter(output, text).then(() => {
            // Scroll to bottom of terminal
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        });
    }
    
    /**
     * Processes user commands from the input field
     * Displays the command, processes it, clears input, and updates UI
     */
    function processCommand() {
        const command = terminalInput.value.trim();
        if (!command) return;
        
        // Add command to output
        addOutput(`user@akash:~$ ${command}`);
        
        // Process command
        handleCommand(command);
        
        // Clear input
        terminalInput.value = '';
        
        // Reset cursor position
        updateCursorPosition();
        
        // Scroll to bottom of terminal
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
    
    /**
     * Routes commands to their appropriate handler functions
     * Supports various terminal-style commands for portfolio navigation
     * @param {string} command - The command to process
     */
    function handleCommand(command) {
        switch(command.toLowerCase()) {
            case 'help':
                showHelp();
                break;
            case 'about':
                showAbout();
                break;
            case 'projects':
            case 'ls projects/':
                showProjects();
                break;
            case 'skills':
            case 'cat skills.txt':
                showSkills();
                break;
            case './run --profile':
                showProfile();
                break;
            case 'git log --oneline':
                showGitLog();
                break;
            case 'clear':
                clearTerminal();
                break;
            case 'sudo rm -rf /':
                showAccessDenied();
                break;
            case 'ping google.com':
                showPingResponse();
                break;
            case 'whoami':
                showWhoami();
                break;
            case 'exit':
            case 'quit':
                addOutput('Cannot exit: You are trapped in the matrix...');
                break;
            case 'matrix':
                showMatrixEasterEgg();
                break;
            default:
                addOutput(`Command not found: ${command}. Type 'help' for available commands.`);
        }
    }
    
    /**
     * Command Handlers
     * The following functions handle specific terminal commands
     */
    
    /**
     * Displays available commands and their descriptions
     */
    function showHelp() {
        addOutput('Available commands:');
        addOutput('  help         - Show this help message');
        addOutput('  about        - About Akash Nanavati');
        addOutput('  projects     - View projects');
        addOutput('  skills       - View skills');
        addOutput('  ./run --profile - Show profile information');
        addOutput('  ls projects/ - List projects');
        addOutput('  git log --oneline - Show commit history');
        addOutput('  clear        - Clear terminal');
        addOutput('  whoami       - Who are you?');
        addOutput('  ping google.com - Test network connection');
        addOutput('  exit, quit   - Exit terminal (or try to)');
    }
    
    /**
     * Displays information about Akash Nanavati
     */
    function showAbout() {
        addOutput('About Akash Nanavati:');
        addOutput('Akash Nanavati is a full-stack developer with a passion for creating');
        addOutput('innovative solutions and clean, efficient code. With expertise');
        addOutput('in multiple programming languages and frameworks, Akash');
        addOutput('specializes in building responsive web applications, RESTful APIs,');
        addOutput('and scalable backend systems.');
    }
    
    /**
     * Displays a list of projects with descriptions
     * Creates styled project elements with fade-in animation
     */
    function showProjects() {
        addOutput('Projects:');
        
        const projects = [
            {
                name: 'E-Commerce Platform',
                description: 'Full-stack e-commerce solution with React, Node.js, and MongoDB'
            },
            {
                name: 'AI Chat Assistant',
                description: 'Intelligent chatbot using NLP and machine learning algorithms'
            },
            {
                name: 'Crypto Tracker',
                description: 'Real-time cryptocurrency tracking dashboard with data visualization'
            },
            {
                name: 'Task Management API',
                description: 'RESTful API for task management with authentication and authorization'
            }
        ];
        
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project-item fade-in';
            
            const title = document.createElement('div');
            title.className = 'project-title';
            title.textContent = project.name;
            
            const description = document.createElement('div');
            description.textContent = project.description;
            
            projectElement.appendChild(title);
            projectElement.appendChild(description);
            terminalOutput.appendChild(projectElement);
        });
    }
    
    /**
     * Displays skills with animated progress bars
     * Creates visual representation of skill proficiency levels
     */
    function showSkills() {
        addOutput('Skills:');
        
        const skills = [
            { name: 'JavaScript', level: 95 },
            { name: 'React', level: 90 },
            { name: 'Node.js', level: 85 },
            { name: 'Python', level: 80 },
            { name: 'Docker', level: 75 },
            { name: 'SQL', level: 85 },
            { name: 'MongoDB', level: 80 },
            { name: 'AWS', level: 70 }
        ];
        
        skills.forEach(skill => {
            const skillContainer = document.createElement('div');
            skillContainer.className = 'progress-container fade-in';
            
            const skillName = document.createElement('div');
            skillName.textContent = skill.name;
            
            const progressBar = document.createElement('div');
            progressBar.className = 'progress-bar';
            
            const progressFill = document.createElement('div');
            progressFill.className = 'progress-fill';
            progressFill.style.width = `${skill.level}%`;
            
            const progressText = document.createElement('div');
            progressText.className = 'progress-text';
            progressText.textContent = `${skill.level}%`;
            
            progressBar.appendChild(progressFill);
            progressBar.appendChild(progressText);
            
            skillContainer.appendChild(skillName);
            skillContainer.appendChild(progressBar);
            
            terminalOutput.appendChild(skillContainer);
            
            // Trigger animation
            setTimeout(() => {
                progressFill.style.width = `${skill.level}%`;
            }, 100);
        });
    }
    
    /**
     * Displays personal profile information
     * Shows contact details and professional information
     */
    function showProfile() {
        addOutput('Profile Information:');
        addOutput('Name: Akash Nanavati');
        addOutput('Role: Full-Stack Developer');
        addOutput('Location: Surat, Gujarat, India');
        addOutput('Experience: 8+ years');
        addOutput('Email: akashnanavati.dev@yahoo.com');
        addOutput('GitHub: github.com/akashnanavati-dev');
        addOutput('LinkedIn: linkedin.com/in/akashnanavati');
    }
    
    /**
 * Displays a simulated git log with recent commits
 * Shows a list of commit hashes and messages in the terminal
 */
function showGitLog() {
    addOutput('Recent commits:');
    
    const commits = [
        { hash: 'a1b2c3d', message: 'Fix responsive layout issues on mobile' },
        { hash: 'e4f5g6h', message: 'Add dark mode toggle feature' },
        { hash: 'i7j8k9l', message: 'Implement real-time notifications' },
        { hash: 'm1n2o3p', message: 'Optimize database queries for better performance' },
        { hash: 'q4r5s6t', message: 'Integrate payment gateway API' },
        { hash: 'u7v8w9x', message: 'Add unit tests for core components' },
        { hash: 'y1z2a3b', message: 'Initial commit' }
    ];
    
    const logElement = document.createElement('div');
    logElement.className = 'git-log';
    
    commits.forEach(commit => {
        const commitLine = document.createElement('p');
        
        const hash = document.createElement('span');
        hash.className = 'git-hash';
        hash.textContent = commit.hash;
        
        commitLine.appendChild(hash);
        commitLine.appendChild(document.createTextNode(commit.message));
        
        logElement.appendChild(commitLine);
    });
    
    terminalOutput.appendChild(logElement);
}

/**
 * Clears all content from the terminal output area
 * Removes all child elements and displays a confirmation message
 */
function clearTerminal() {
    while (terminalOutput.firstChild) {
        terminalOutput.removeChild(terminalOutput.firstChild);
    }
    addOutput('Terminal cleared.');
}

/**
 * Displays an access denied message and triggers an easter egg modal
 * This function is called when the user attempts to use the 'sudo rm -rf /' command
 */
function showAccessDenied() {
    addOutput('Access Denied: Nice try!', 'access-denied');
    
    // Show easter egg modal
    easterEggContent.innerHTML = `
        <h2 class="access-denied">ACCESS DENIED</h2>
        <p>Unauthorized system destruction attempt detected!</p>
        <p>This incident has been reported to the cyber police.</p>
        <img src="https://media.giphy.com/media/YQitE4YNQNahy/giphy.gif" alt="Hacker GIF" width="100%">
    `;
    easterEggModal.style.display = 'flex';
    }
    
    /**
     * Simulates a ping response to google.com
     * Displays a series of ping replies with timing information
     * and a summary of the ping statistics
     */
    function showPingResponse() {
        addOutput('PING google.com (142.250.190.78): 56 data bytes', 'network-response');
        
        // Simulate ping responses
        setTimeout(() => {
            addOutput('64 bytes from 142.250.190.78: icmp_seq=0 ttl=57 time=<span class="ping-time">14.252</span> ms', 'network-response');
        }, 500);
        
        setTimeout(() => {
            addOutput('64 bytes from 142.250.190.78: icmp_seq=1 ttl=57 time=<span class="ping-time">15.874</span> ms', 'network-response');
        }, 1000);
        
        setTimeout(() => {
            addOutput('64 bytes from 142.250.190.78: icmp_seq=2 ttl=57 time=<span class="ping-time">13.981</span> ms', 'network-response');
        }, 1500);
        
        setTimeout(() => {
            addOutput('64 bytes from 142.250.190.78: icmp_seq=3 ttl=57 time=<span class="ping-time">14.563</span> ms', 'network-response');
        }, 2000);
        
        setTimeout(() => {
            addOutput('--- google.com ping statistics ---', 'network-response');
            addOutput('4 packets transmitted, 4 packets received, 0.0% packet loss', 'network-response ping-success');
            addOutput('round-trip min/avg/max/stddev = 13.981/14.668/15.874/0.782 ms', 'network-response');
        }, 2500);
    }
    
    /**
     * Displays a random hacker alias as a response to the 'whoami' command
     * Selects a random name from a predefined list of hacker aliases
     */
    function showWhoami() {
        const hackerAliases = [
            'NeoTheMatrix',
            'CyberPhantom',
            'CodeNinja',
            'HexHunter',
            'ByteMaster',
            'QuantumHacker',
            'ShadowByte',
            'CipherPunk'
        ];
        
        const randomAlias = hackerAliases[Math.floor(Math.random() * hackerAliases.length)];
        addOutput(`You are: ${randomAlias}`, 'glitch');
    }
    
    /**
     * Creates and displays the Matrix code rain animation in a modal
     * This is triggered by the 'matrix' command as an easter egg
     */
    function showMatrixEasterEgg() {
        // Show easter egg modal with Matrix code rain
        easterEggContent.innerHTML = `
            <h2>Welcome to the Matrix</h2>
            <p>The Matrix has you...</p>
            <p>Follow the white rabbit.</p>
            <canvas id="matrix-canvas" width="500" height="300"></canvas>
        `;
        easterEggModal.style.display = 'flex';
        
        // Create Matrix code rain in the modal
        const canvas = document.getElementById('matrix-canvas');
        const ctx = canvas.getContext('2d');
        
        const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';
        const columns = canvas.width / 20;
        const drops = [];
        
        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
        
        /**
         * Draws a single frame of the Matrix animation
         * Creates the falling character effect with random characters
         */
        function drawMatrix() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0f0';
            ctx.font = '15px monospace';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters.charAt(Math.floor(Math.random() * characters.length));
                ctx.fillText(text, i * 20, drops[i] * 20);
                
                if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(drawMatrix, 50);
        
        // Clear interval when modal is closed
        closeModal.addEventListener('click', () => {
            clearInterval(matrixInterval);
        });
    }
    
    // ======================================
    // Event Listeners and Initialization
    // ======================================

    /**
     * Event listener for terminal input
     * Processes commands when Enter key is pressed
     */
    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            processCommand();
        }
    });
    
    /**
     * Event listener for modal close button
     * Closes the easter egg modal when X is clicked
     */
    closeModal.addEventListener('click', function() {
        easterEggModal.style.display = 'none';
    });
    
    /**
     * Event listener for clicks outside the modal
     * Closes the easter egg modal when clicking outside of it
     */
    window.addEventListener('click', function(e) {
        if (e.target === easterEggModal) {
            easterEggModal.style.display = 'none';
        }
    });
    
    /**
     * Event listener for window resize
     * Adjusts the matrix background canvas dimensions when window is resized
     */
    window.addEventListener('resize', function() {
        const canvas = document.querySelector('.matrix-bg');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
    });
    
    // Initialize the terminal when the page loads
    initTerminal();
});