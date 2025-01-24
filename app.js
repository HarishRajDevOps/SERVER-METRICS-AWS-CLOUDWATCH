//v4
const express = require('express');
const axios = require('axios').default;
const si = require('systeminformation');
const basicAuth = require('express-basic-auth'); // Add basic auth

const app = express();
const PORT = 7002;

// Dynamically update password during runtime
let password = process.env.METRICS_API_PASSWORD || 'defaultPassword';

// Function to update password dynamically if needed
const updatePassword = (newPassword) => {
    password = newPassword;
    users['admin'] = password;  // Update the users object dynamically
};

// Allow updating password via an API endpoint
app.post('/update-password', express.json(), (req, res) => {
    const newPassword = req.body.password;
    if (newPassword) {
        updatePassword(newPassword);
        return res.status(200).send('Password updated successfully.');
    } else {
        return res.status(400).send('New password not provided.');
    }
});

// Ensure the password is always a string and assign it to the users object
const users = {};
users['admin'] = password;


// Basic authentication middleware for /metrics endpoint
app.use('/metrics', basicAuth({
    users: users,
    challenge: true,
    unauthorizedResponse: 'Unauthorized'
}));


// Function to get disk usage
async function getDiskUsage() {
    const disks = await si.fsSize();
    return disks && Array.isArray(disks) ? disks.map(disk => ({
        filesystem: disk.fs,
        size: disk.size,
        used: disk.used,
        available: disk.available,
        use: disk.use
    })) : [];
}

// Function to get network speed (Upload/Download) and convert to Mbit/s
async function getNetworkSpeed() {
    const networkStats = await si.networkStats();
    return networkStats && Array.isArray(networkStats) ? networkStats.map(network => {
        const downloadSpeed = network.rx_bytes; // Bytes received
        const uploadSpeed = network.tx_bytes; // Bytes transmitted

        // Convert bytes to bits (1 byte = 8 bits)
        const downloadSpeedInBits = downloadSpeed * 8;
        const uploadSpeedInBits = uploadSpeed * 8;

        // Convert to Mbit/s (1 Mbit = 1,000,000 bits)
        const downloadSpeedInMbit = downloadSpeedInBits / 1_000_000;
        const uploadSpeedInMbit = uploadSpeedInBits / 1_000_000;

        return {
            iface: network.iface,
            downloadSpeedInMbit: downloadSpeedInMbit.toFixed(2), // Rounded to 2 decimal places
            uploadSpeedInMbit: uploadSpeedInMbit.toFixed(2) // Rounded to 2 decimal places
        };
    }) : [];
}


// Function to get BIOS information
async function getBiosInfo() {
    const bios = await si.bios();
    return bios ? {
        vendor: bios.vendor,
        version: bios.version,
        releaseDate: bios.releaseDate
    } : {};
}

// Function to get processor information
async function getProcessorInfo() {
    const cpu = await si.cpu();
    return cpu ? {
        model: cpu.manufacturer + ' ' + cpu.model,
        cores: cpu.cores,
        speed: cpu.speed
    } : {};
}

// Function to get uptime in seconds or minutes
async function getUptime() {
    const uptime = await si.time();
    const uptimeSeconds = uptime ? uptime.uptime : 0;
    const uptimeMinutes = uptimeSeconds / 60;
    return { uptimeSeconds, uptimeMinutes };
}

// Function to get the last system restart time
async function getLastRestartTime() {
    const system = await si.system();
    const uptime = await si.time();
    const currentTime = new Date();
    const lastRestartTime = new Date(currentTime - (uptime && uptime.uptime ? uptime.uptime : 0) * 1000);
    return lastRestartTime;
}

// Function to get used RAM in GB
async function getRAMInMB() {
    const memory = await si.mem();
    return memory ? {
        total: (memory.total / 1024 / 1024).toFixed(2), // Convert to MB
        used: (memory.used / 1024 / 1024).toFixed(2), // Convert to MB
        available: (memory.available / 1024 / 1024).toFixed(2) // Convert to MB
    } : {};
}

// Function to get the CPU core count
async function getCPUCoreCount() {
    const cpu = await si.cpu();
    return cpu ? cpu.cores : 0;
}

// Function to get CPU usage percentage
async function getCpuUsage() {
    const load = await si.currentLoad();
    return load ? load.currentLoad : 0; // CPU load in percentage
}

// // Function to get container count (this assumes Docker is installed)
// async function getDockerOverview() {
//     const dockerContainers = await si.dockerContainers();
//     return dockerContainers && Array.isArray(dockerContainers) ? dockerContainers.length : 0;
// }

// Function to gather Docker overview
async function getDockerOverview() {
    try {
        const containers = await si.dockerContainers(); // Get all Docker containers
        const images = await si.dockerImages(); // Get all Docker images
        const volumes = await si.fsStats(); // Get all Docker volumes (via filesystem stats)

        const overview = {
            totalContainers: containers.length, // Total container count
            runningContainers: containers.filter(container => container.state === 'running').length, // Running containers
            stoppedContainers: containers.filter(container => container.state === 'exited').length, // Stopped containers
            totalImages: images.length, // Total image count
            totalVolumes: volumes.length, // Total volumes (approximation via fsStats)
            volumeDetails: volumes.map(volume => ({
                fs: volume.fs,
                used: (volume.used / (1024 * 1024 * 1024)).toFixed(2) + ' GB', // Used space in GB
                available: (volume.available / (1024 * 1024 * 1024)).toFixed(2) + ' GB', // Available space in GB
                total: (volume.total / (1024 * 1024 * 1024)).toFixed(2) + ' GB', // Total space in GB
                usagePercentage: volume.percent + '%' // Usage percentage
            }))
        };

        return overview;
    } catch (error) {
        console.error('Error fetching Docker overview:', error.message);
        return { error: 'Unable to fetch Docker details. Please ensure Docker is running.' };
    }
}



// Additional Metrics Functions

// Function to get system temperature (e.g., CPU, GPU)
async function getSystemTemperature() {
    try {
        const temperature = await si.cpuTemperature();
        return temperature ? temperature : null;
    } catch (error) {
        return null;
    }
}

// Function to get top processes (by CPU and memory usage)
async function getTopProcesses() {
    try {
        const processes = await si.processes();
        const sortedByCpu = processes.list ? processes.list.sort((a, b) => b.cpu - a.cpu) : [];
        const sortedByMem = processes.list ? processes.list.sort((a, b) => b.mem - a.mem) : [];
        return {
            topCpuProcesses: sortedByCpu.slice(0, 5), // Top 5 processes by CPU usage
            topMemoryProcesses: sortedByMem.slice(0, 5) // Top 5 processes by memory usage
        };
    } catch (error) {
        return { topCpuProcesses: [], topMemoryProcesses: [] };
    }
}

// Function to get detailed file system usage
async function getFileSystemUsage() {
    const fsDetails = await si.fsStats();
    return fsDetails && Array.isArray(fsDetails) ? fsDetails.map(fs => ({
        fs: fs.fs,
        used: fs.used,
        available: fs.available,
        total: fs.total,
        percent: fs.percent
    })) : [];
}

// Function to get active network connections
async function getActiveConnections() {
    const connections = await si.networkConnections();
    return connections && Array.isArray(connections) ? connections.filter(conn => conn.type === 'TCP') : [];
}

// Function to get system memory details
async function getSystemMemoryDetails() {
    const memory = await si.mem();
    return memory ? {
        total: memory.total,
        free: memory.free,
        used: memory.used,
        active: memory.active,
        available: memory.available,
        buffers: memory.buffers,
        cached: memory.cached
    } : {};
}

// Function to get load average over 1, 5, and 15 minutes (Linux only)
async function getLoadAverage() {
    const loadAvg = await si.currentLoad();
    return loadAvg && loadAvg.loadavg ? loadAvg.loadavg : [];
}

// Function to get running services (Windows/Linux)
async function getRunningServices() {
    try {
        const services = await si.services();
        return services && Array.isArray(services) ? services : [];
    } catch (error) {
        return [];
    }
}

// Function to get operating system info (name, version)
async function getOSInfo() {
    const osInfo = await si.osInfo();
    return osInfo ? {
        os: osInfo.distro,
        version: osInfo.release,
        architecture: osInfo.arch
    } : {};
}

// Gather all system metrics
async function gatherMetrics() {
    const diskUsage = await getDiskUsage();
    const networkSpeed = await getNetworkSpeed();
    const biosInfo = await getBiosInfo();
    const processor = await getProcessorInfo();
    const uptime = await getUptime();
    const lastRestartTime = await getLastRestartTime();
    const RAMInMB = await getRAMInMB();
    const cpuCoreCount = await getCPUCoreCount();
    const cpuUsage = await getCpuUsage();
    const dockerOverview = await getDockerOverview();
    const systemTemperature = await getSystemTemperature();
    const topProcesses = await getTopProcesses();
    const fileSystemUsage = await getFileSystemUsage();
    const activeConnections = await getActiveConnections();
    const systemMemoryDetails = await getSystemMemoryDetails();
    const loadAvg = await getLoadAverage();
    const runningServices = await getRunningServices();
    const osInfo = await getOSInfo();

    return {
        diskUsage,
        networkSpeed,
        biosInfo,
        processor,
        uptime,
        lastRestartTime,
        RAMInMB,
        cpuCoreCount,
        cpuUsage,
        dockerOverview,
        systemTemperature,
        topProcesses,
        fileSystemUsage,
        activeConnections,
        systemMemoryDetails,
        loadAvg,
        runningServices,
        osInfo
    };
}

// Endpoint to collect metrics
app.get('/metrics', async (req, res) => {
    try {
        const metrics = await gatherMetrics();
        console.log('Collected Metrics:', metrics);
        res.json(metrics);
    } catch (error) {
        res.status(500).send('Error collecting metrics: ' + error.message);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Metrics collector running on http://localhost:${PORT}`);
});
