#### docker部署elastic中的一些坑

> elasticsearch 7.2
> 参考: https://hub.docker.com/_/elasticsearch

> 问题1: elastic 的 data 和 log 目录无法挂载到本地。

权限不足，docker 在 root 用户下运行，而 elasticsearch 在 elasticsearch 用户下运行，导致 elasticsearch 权限不足。
给本地的相应目录刷上 1000 用户和用户组。


```shell
chown -R 1000 /data/elasticsearch
```

> 问题2: docker容器之间不能通过域名访问，比如访问 http://elasticsearch:9200 失败。

容器不在同一网络导致。

执行 docker network ls 查看

```
NETWORK ID          NAME                      DRIVER              SCOPE
4c42c11161ba        bridge                    bridge              local
0509607212a4        host                      host                local
f47239827adc        none                      null                local
2f5e2528b598        elk_default               bridge              local
```

解决方案 1: 

把所有 docker-compose.yml 放在同一个目录下，这样创建的网络就都叫 xx_network，就可以互通了。

解决方案 2: 

创建一个新的网络，然后在docker-compose.yml指定向这个网络。

```
docker network create bridge

# 修改 docker-compose.yml中network配置

networks:
  bridge:
    external:
      name: bridge
```

> 问题3: elasticsearch exited with code 78

修改 /etc/sysctl.conf 文件，增大 max_map_count 的值。

```shell
vm.max_map_count=655360
```

> 问题4：docker-compose.yml 中映射的elasticsearch.yml文件是用来干嘛的？

单节点es，开启外部机器访问。