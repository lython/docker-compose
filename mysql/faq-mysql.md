### docker中部署mysql遇到的问题

> 版本: mariadb:10.4-bionic
> 参考: https://hub.docker.com/_/mariadb

**问题1. mysql的db和log目录的权限问题**

同样，mysql是在mysql用户下运行的，需要更改本地目录权限。

```shell
chown -R systemd-bus-proxy /data/mysql
```

**问题2. 想在容器启动的时候，对mysql数据库执行一些初始化操作。**

映射一些本地的sql或sh脚本到容器中的/docker-entrypoint-initdb.d目录即可

```yaml
volumes:
  - ./setup:/docker-entrypoint-initdb.d
```

**问题3. mysql使用自己的配置文件**

将mysql配置文件映射到容器中即可。

```yaml
volumes:
  - ./conf.d/my.cnf:/etc/mysql/conf.d/my.cnf
```

