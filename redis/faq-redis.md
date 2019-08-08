#### docker中部署redis遇到的问题

> 版本: redis 5.05
> 参考: https://hub.docker.com/_/redis

Q1: redis运行一段时间之后就会写失败，查看log报Short write while writing to the AOF file错误。

A: 这个问题需要消灭redis启动时候的三个警告。

1: WARNING The TCP backlog setting of 511 cannot be enforced because /proc/sys/net/core/somaxconn is set to the lower value of 128.

A: 需要将docker容器中的/proc/sys/net/core/somaxconn值修改到大于511。
修改docker-compose中的command参数即可，使它再执行一条命令。

```yaml
command:
  - /bin/sh
  - -c 
  - |
    echo 1024 > /proc/sys/net/core/somaxconn
    redis-server --appendonly yes
```

2: WARNING overcommit_memory is set to 0! Background save may fail under low memory condition. To fix this issue add 'vm.overcommit_memory = 1' to /etc/sysctl.conf and then reboot or run the command 'sysctl vm.overcommit_memory=1' for this to take effect.

A: 修改主机配置（非docker容器），向/etc/sysctl.conf中添加
vm.overcommit_memory = 1，然后执行 sysctl -p使其生效。

3: WARNING you have Transparent Huge Pages (THP) support enabled in your kernel. This will create latency and memory usage issues with Redis. To fix this issue run the command 'echo never > /sys/kernel/mm/transparent_hugepage/enabled' as root, and add it to your /etc/rc.local in order to retain the setting after a reboot. Redis must be restarted after THP is disabled.

A: 在主机环境中，执行

```shell
echo never > /sys/kernel/mm/transparent_hugepage/enable
```

为了保证一直有效，需要将这条命令添加到开机启动项中。