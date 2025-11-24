module.exports = {
  apps: [
    {
      name: 'ApiMapaSeg',
      script: 'npm',
      args: 'run start:prod',
      watch: true, // reiniciar automáticamente la aplicación al cambiar los archivos
      env: {
        NODE_ENV: 'development',
      },
    },
  ],
};
