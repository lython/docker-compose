#### docker中部署mongo遇到的问题

> 版本: mongo 4.1.13
> 参考: https://hub.docker.com/_/mongo

Q1: mongo的db和log目录的权限问题

A: 同样，mongo是在mongodb用户下运行的，需要更改本地目录权限。

```shell
chown -R systemd-bus-proxy /data/mongo
```

Q2: 想在容器启动的时候，对mongo数据库执行一些初始化操作。

A: 映射一些本地的js或sh脚本到容器中的/docker-entrypoint-initdb.d目录即可

```yaml
volumes:
  - ./setup:/docker-entrypoint-initdb.d
```

Q3: 以mongod.conf的样式启动mongo

A: 将mongo配置文件映射到容器中，然后修改command命令。

```yaml
volumes:
  - ./mongod.conf:/etc/mongod.conf
command: mongod -f /etc/mongod.conf
```
