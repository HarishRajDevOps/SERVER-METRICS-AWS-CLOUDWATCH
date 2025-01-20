// const express = require('express');
// const os = require('os');
// const axios = require('axios').default;
// const si = require('systeminformation');
// const basicAuth = require('express-basic-auth'); // Add basic auth

// const app = express();
// const PORT = 3000;

// // Get dynamic password from environment variables
// const password = process.env.METRICS_API_PASSWORD || 'defaultPassword';

// // Use basic authentication middleware for /metrics endpoint
// app.use('/metrics', basicAuth({
//     users: { 'admin': password },
//     challenge: true,
//     unauthorizedResponse: 'Unauthorized'
// }));

// // Function to get disk usage
// async function getDiskUsage() {
//     const disks = await si.fsSize();
//     return disks.map(disk => ({
//         filesystem: disk.fs,
//         size: disk.size,
//         used: disk.used,
//         available: disk.available,
//         use: disk.use
//     }));
// }

// // Example function to gather system metrics
// async function gatherMetrics() {
//     const diskUsage = await getDiskUsage();
//     const load = await si.currentLoad();
//     const memory = await si.mem();
    
//     return {
//         diskUsage,
//         load,
//         memory
//     };
// }

// // Endpoint to collect metrics
// app.get('/metrics', async (req, res) => {
//     try {
//         const metrics = await gatherMetrics();
//         console.log('Collected Metrics:', metrics);
//         res.json(metrics);
//     } catch (error) {
//         res.status(500).send('Error collecting metrics: ' + error.message);
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Metrics collector running on http://localhost:${PORT}`);
// });




//v2
// const express = require('express');
// const axios = require('axios').default;
// const si = require('systeminformation');
// const basicAuth = require('express-basic-auth'); // Add basic auth

// const app = express();
// const PORT = 3000;

// // Get dynamic password from environment variables
// const password = process.env.METRICS_API_PASSWORD || 'defaultPassword';

// // Use basic authentication middleware for /metrics endpoint
// app.use('/metrics', basicAuth({
//     users: { 'admin': password },
//     challenge: true,
//     unauthorizedResponse: 'Unauthorized'
// }));

// // Function to get disk usage
// async function getDiskUsage() {
//     const disks = await si.fsSize();
//     return disks.map(disk => ({
//         filesystem: disk.fs,
//         size: disk.size,
//         used: disk.used,
//         available: disk.available,
//         use: disk.use
//     }));
// }

// // Function to get network speed (Upload/Download)
// async function getNetworkSpeed() {
//     const networkStats = await si.networkStats();
//     return networkStats.map(network => ({
//         iface: network.iface,
//         speed: network.speed,
//         receivedBytes: network.rx_bytes,
//         transmittedBytes: network.tx_bytes
//     }));
// }

// // Function to get BIOS information
// async function getBiosInfo() {
//     const bios = await si.bios();
//     return {
//         vendor: bios.vendor,
//         version: bios.version,
//         releaseDate: bios.releaseDate
//     };
// }

// // Function to get processor information
// async function getProcessorInfo() {
//     const cpu = await si.cpu();
//     return {
//         model: cpu.manufacturer + ' ' + cpu.model,
//         cores: cpu.cores,
//         speed: cpu.speed
//     };
// }
// // Function to get uptime in seconds or minutes
// async function getUptime() {
//     const uptime = await si.time();
//     const uptimeSeconds = uptime.uptime;
//     const uptimeMinutes = uptimeSeconds / 60;
    
//     console.log(`Uptime in seconds: ${uptimeSeconds}`);
//     console.log(`Uptime in minutes: ${uptimeMinutes.toFixed(2)}`);
    
//     return { uptimeSeconds, uptimeMinutes };
// }

// // Function to get the last system restart time
// async function getLastRestartTime() {
//     const system = await si.system();
//     const uptime = await si.time();
    
//     // Get current date and time
//     const currentTime = new Date();
    
//     // Calculate last restart time by subtracting uptime from the current time
//     const lastRestartTime = new Date(currentTime - uptime.uptime * 1000); // uptime is in seconds, so multiply by 1000 to convert to ms
    
//     console.log(`Last system restart time: ${lastRestartTime}`);
    
//     return lastRestartTime;
// }

// // Function to get used RAM in GB
// async function getUsedRAMInGB() {
//     const memory = await si.mem();
//     return memory.used / (1024 * 1024 * 1024); // Convert to GB
// }

// // Function to get the CPU core count
// async function getCPUCoreCount() {
//     const cpu = await si.cpu();
//     return cpu.cores;
// }

// // Function to get CPU usage percentage
// async function getCpuUsage() {
//     const load = await si.currentLoad();
//     return load.currentLoad; // CPU load in percentage
// }

// // Function to get container count (this assumes Docker is installed)
// async function getActualContainerCount() {
//     const dockerContainers = await si.dockerContainers();
//     return dockerContainers.length;
// }

// // Function to gather all system metrics
// async function gatherMetrics() {
//     const diskUsage = await getDiskUsage();
//     const networkSpeed = await getNetworkSpeed();
//     const biosInfo = await getBiosInfo();
//     const processor = await getProcessorInfo();
//     const uptime = await getUptime();
//     const lastRestartTime = await getLastRestartTime();
//     const usedRAMInGB = await getUsedRAMInGB();
//     const cpuCoreCount = await getCPUCoreCount();
//     const cpuUsage = await getCpuUsage();
//     const actualContainerCount = await getActualContainerCount();

//     return {
//         diskUsage,
//         networkSpeed,
//         biosInfo,
//         processor,
//         uptime,
//         lastRestartTime,
//         usedRAMInGB,
//         cpuCoreCount,
//         cpuUsage,
//         actualContainerCount
//     };
// }

// // Endpoint to collect metrics
// app.get('/metrics', async (req, res) => {
//     try {
//         const metrics = await gatherMetrics();
//         console.log('Collected Metrics:', metrics);
//         res.json(metrics);
//     } catch (error) {
//         res.status(500).send('Error collecting metrics: ' + error.message);
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Metrics collector running on http://localhost:${PORT}`);
// });



//v3
// const express = require('express');
// const axios = require('axios').default;
// const si = require('systeminformation');
// const basicAuth = require('express-basic-auth'); // Add basic auth

// const app = express();
// const PORT = 3000;

// // Get dynamic password from environment variables
// const password = process.env.METRICS_API_PASSWORD || 'defaultPassword';

// // Use basic authentication middleware for /metrics endpoint
// app.use('/metrics', basicAuth({
//     users: { 'admin': password },
//     challenge: true,
//     unauthorizedResponse: 'Unauthorized'
// }));

// // Function to get disk usage
// async function getDiskUsage() {
//     const disks = await si.fsSize();
//     return disks.map(disk => ({
//         filesystem: disk.fs,
//         size: disk.size,
//         used: disk.used,
//         available: disk.available,
//         use: disk.use
//     }));
// }

// // Function to get network speed (Upload/Download)
// async function getNetworkSpeed() {
//     const networkStats = await si.networkStats();
//     return networkStats.map(network => ({
//         iface: network.iface,
//         speed: network.speed,
//         receivedBytes: network.rx_bytes,
//         transmittedBytes: network.tx_bytes
//     }));
// }

// // Function to get BIOS information
// async function getBiosInfo() {
//     const bios = await si.bios();
//     return {
//         vendor: bios.vendor,
//         version: bios.version,
//         releaseDate: bios.releaseDate
//     };
// }

// // Function to get processor information
// async function getProcessorInfo() {
//     const cpu = await si.cpu();
//     return {
//         model: cpu.manufacturer + ' ' + cpu.model,
//         cores: cpu.cores,
//         speed: cpu.speed
//     };
// }

// // Function to get uptime in seconds or minutes
// async function getUptime() {
//     const uptime = await si.time();
//     const uptimeSeconds = uptime.uptime;
//     const uptimeMinutes = uptimeSeconds / 60;
//     return { uptimeSeconds, uptimeMinutes };
// }

// // Function to get the last system restart time
// async function getLastRestartTime() {
//     const system = await si.system();
//     const uptime = await si.time();
//     const currentTime = new Date();
//     const lastRestartTime = new Date(currentTime - uptime.uptime * 1000);
//     return lastRestartTime;
// }

// // Function to get used RAM in GB
// async function getUsedRAMInGB() {
//     const memory = await si.mem();
//     return memory.used / (1024 * 1024 * 1024); // Convert to GB
// }

// // Function to get the CPU core count
// async function getCPUCoreCount() {
//     const cpu = await si.cpu();
//     return cpu.cores;
// }

// // Function to get CPU usage percentage
// async function getCpuUsage() {
//     const load = await si.currentLoad();
//     return load.currentLoad; // CPU load in percentage
// }

// // Function to get container count (this assumes Docker is installed)
// async function getActualContainerCount() {
//     const dockerContainers = await si.dockerContainers();
//     return dockerContainers.length;
// }

// // Additional Metrics Functions

// // Function to get detailed file system usage (e.g., mount points)
// async function getFileSystemUsage() {
//     const fsDetails = await si.fsStats();
//     return fsDetails.map(fs => ({
//         fs: fs.fs,
//         used: fs.used,
//         available: fs.available,
//         total: fs.total,
//         percent: fs.percent
//     }));
// }

// // Function to get GPU information (if available)
// async function getGpuInfo() {
//     try {
//         const gpu = await si.graphics();
//         return gpu.controllers.map(controller => ({
//             model: controller.model,
//             vram: controller.vram,
//             memorySize: controller.memorySize
//         }));
//     } catch (error) {
//         return [];
//     }
// }

// // Function to get battery information (for laptops)
// async function getBatteryInfo() {
//     try {
//         const battery = await si.battery();
//         return {
//             hasBattery: battery.hasBattery,
//             percent: battery.percent,
//             isCharging: battery.isCharging
//         };
//     } catch (error) {
//         return null;
//     }
// }

// // Function to get load averages (Linux systems)
// async function getLoadAverage() {
//     const loadAvg = await si.currentLoad();
//     return loadAvg.loadavg;
// }

// // Function to get system information (OS details)
// async function getOSInfo() {
//     const osInfo = await si.osInfo();
//     return {
//         os: osInfo.distro,
//         version: osInfo.release,
//         architecture: osInfo.arch
//     };
// }

// // Gather all system metrics
// async function gatherMetrics() {
//     const diskUsage = await getDiskUsage();
//     const networkSpeed = await getNetworkSpeed();
//     const biosInfo = await getBiosInfo();
//     const processor = await getProcessorInfo();
//     const uptime = await getUptime();
//     const lastRestartTime = await getLastRestartTime();
//     const usedRAMInGB = await getUsedRAMInGB();
//     const cpuCoreCount = await getCPUCoreCount();
//     const cpuUsage = await getCpuUsage();
//     const actualContainerCount = await getActualContainerCount();
//     const fileSystemUsage = await getFileSystemUsage();
//     const gpuInfo = await getGpuInfo();
//     const batteryInfo = await getBatteryInfo();
//     const loadAvg = await getLoadAverage();
//     const osInfo = await getOSInfo();

//     return {
//         diskUsage,
//         networkSpeed,
//         biosInfo,
//         processor,
//         uptime,
//         lastRestartTime,
//         usedRAMInGB,
//         cpuCoreCount,
//         cpuUsage,
//         actualContainerCount,
//         fileSystemUsage,
//         gpuInfo,
//         batteryInfo,
//         loadAvg,
//         osInfo
//     };
// }

// // Endpoint to collect metrics
// app.get('/metrics', async (req, res) => {
//     try {
//         const metrics = await gatherMetrics();
//         console.log('Collected Metrics:', metrics);
//         res.json(metrics);
//     } catch (error) {
//         res.status(500).send('Error collecting metrics: ' + error.message);
//     }
// });

// // Start the server
// app.listen(PORT, () => {
//     console.log(`Metrics collector running on http://localhost:${PORT}`);
// });


//v4
const express = require('express');
const axios = require('axios').default;
const si = require('systeminformation');
const basicAuth = require('express-basic-auth'); // Add basic auth

const app = express();
const PORT = 3000;

// Get dynamic password from environment variables
const password = process.env.METRICS_API_PASSWORD || 'defaultPassword';

// Use basic authentication middleware for /metrics endpoint
app.use('/metrics', basicAuth({
    users: { 'admin': password },
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

// Function to get network speed (Upload/Download)
async function getNetworkSpeed() {
    const networkStats = await si.networkStats();
    return networkStats && Array.isArray(networkStats) ? networkStats.map(network => ({
        iface: network.iface,
        speed: network.speed,
        receivedBytes: network.rx_bytes,
        transmittedBytes: network.tx_bytes
    })) : [];
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
async function getUsedRAMInGB() {
    const memory = await si.mem();
    return memory ? memory.used / (1024 * 1024 * 1024) : 0; // Convert to GB
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

// Function to get container count (this assumes Docker is installed)
async function getActualContainerCount() {
    const dockerContainers = await si.dockerContainers();
    return dockerContainers && Array.isArray(dockerContainers) ? dockerContainers.length : 0;
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
    const usedRAMInGB = await getUsedRAMInGB();
    const cpuCoreCount = await getCPUCoreCount();
    const cpuUsage = await getCpuUsage();
    const actualContainerCount = await getActualContainerCount();
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
        usedRAMInGB,
        cpuCoreCount,
        cpuUsage,
        actualContainerCount,
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
