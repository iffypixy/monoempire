import cluster from "cluster";
import os from "os";

export const clusterize = (cb: () => void) => {
    if (cluster.isPrimary) {
        const cpus = os.cpus().length;

        for (let i = 0; i < cpus; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);

            cluster.fork();
        });
    } else {
        console.log(`Worker ${process.pid} is running`);

        cb();
    }
};
