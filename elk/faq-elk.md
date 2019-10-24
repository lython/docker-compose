#### docker部署elastic中的一些坑

> elasticsearch 7.2
> 参考: https://hub.docker.com/_/elasticsearch

Q1: elastic的data和log目录无法挂载到本地。

A: 权限不足，docker在root用户下运行，而elasticsearch在elasticsearch用户下运行，导致elasticsearch权限不足。
给本地的相应目录刷上 1000 用户和用户组。


```shell
chown -R /data/elasticsearch
```

Q2: docker容器之间不能通过域名访问，比如访问 http://elasticsearch:9200 失败。

A: 容器不在同一网络导致。

执行 docker network ls 查看

```
NETWORK ID          NAME                      DRIVER              SCOPE
4c42c11161ba        bridge                    bridge              local
0509607212a4        host                      host                local
f47239827adc        none                      null                local
2f5e2528b598        elk_default               bridge              local
```

解决方案1: 

把所有docker-compose.yml放在同一个目录下，这样创建的网络就都叫 xx_network，就可以互通了。

解决方案2: 

创建一个新的网络，然后在docker-compose.yml指定向这个网络。

```
docker network create bridge

# 修改docker-compose.yml中network配置

networks:
  bridge:
    external:
      name: bridge
```
