#### docker部署elastic中的一些坑

> elasticsearch 7.2
> 参考: https://hub.docker.com/_/elasticsearch

Q1: elastic的data和log目录无法挂载到本地

A: 权限不足，docker在root用户下运行，而elasticsearch在elasticsearch用户下运行，导致elasticsearch权限不足。
给本地的相应目录刷上 1000 用户和用户组。


```shell
chown -R /data/elasticsearch
```