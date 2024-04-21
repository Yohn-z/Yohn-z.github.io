# Docker ?

我之前大概浏览过Docker的整体架构图，比较类似C/S架构模式，用户使用Docker Client与Docker Daemon进行交互，Docker Daemon就类似于Server部分，首先可以接受Docker Client的请求，而后Engine执行Docker内部的一系列的工作，每一项工作是以Job的形势存在的，Job需要容器镜像时，则从Docker Registry中下载，并通过镜像管理驱动graph driver 将下载的镜像以graph的形式存储，当需要为Docker创建网络环境的时候，通过网络管理驱动network driver创建并配置Docker的网络环境，当需要限制Docker的运行的资源或执行用户的指令时，通过exec driver来完成，当执行完运行容器的指令后，一个实际的Docker容器就处于运行状态，该容器拥有独立的文件系统，独立且安全的运行环境

# Docker Client ？

Docker Client是Docker架构中用来和Docker Daemon建立通信的客户端

Docker Client有三种方式和Docker Daemon建立通信

- tcp://host:port
- unix://path_to_socket
- fd://socketfd

我在本地电脑(Mac)上关闭Docker Daemon，出现的结果是

> Cannot connect to the Docker daemon at unix:///var/run/docker.sock. Is the docker daemon running?


当然也可以通过设置flag参数来设置TLS（安全传输层协议）有关的参数，确保传输安全性。

Docker Client 发出容器管理请求之后，Docker Daemon接受并处理请求，Docker Client收到了返回的请求，这样Docker Client的一次生命周期就结束了。

# Docker Daemon ?

Docker Daemon是Docker架构中常驻在系统后台的一个进程，该进程在后台启动了一个Server，负责接受Docker Client的请求，然后通过路由去调用不同的Handler来执行请求

Docker Daemon大致有三个部分：

1. Docker Server

Docker Server是专门服务于Docker Client

在启动的过程中，通过`gorilla/mux`，创建一个mux.Router，提供请求的路由功能，一个请求过来，Server创建一个新的goroutine来服务这个请求，在goroutine中，首先读取请求内容，然后做解析，然后根据路由找到对应的Handler来处理，处理完了之后返回响应结果

其实呢，Docker Server也是靠一个叫“serverapi”的job的运行来完成的，原则上Docker Server是众多Job中的一个。

2. Engine

Engine是Docker架构中的运行引擎，同时也是Docker运行的核心模块，通过执行job的方式来管理、操纵所有的容器

在Engine中有一个比较出众的对象叫handler，这个对象存储的是特定的job与handler的对应关系，那比如，{"create":daemon.ContainerCreate}，这个就说明当名为"create"的job在运行的时候所执行的handler是daemon.ContainerCreate

3. Job

一个Job是Engine中最基本的工作执行单元，Docker的每一项工作其实都可以抽成一个Job

Job的设计者把Job设计的与Unix的进程相似，比如Job也有名称、参数、环境变量、标准输入输出这些，甚至还有错误处理

# Docker Registry ？

Docker Registry是一个存储 `容器镜像`的仓库，容器镜像就是容器在被创建时，被加载用来初始化容器的文件架构和目录

Docker运行的过程中，Docker Daemon会与Docker Registry通信，主要就是搜索镜像、下载镜像、上传镜像这几个，这三个对应的job分别是search、pull和push

我们一般使用的都是公有的比如Docker Hub

# Graph ？

Graph就像是已经下载到本地的镜像的保管者，它存储着下载到本地的镜像，同时通过GraphDB来记录所有镜像之间的关系

# Driver ？

Driver是Docker架构中的驱动模块，并非所有用户操作都是针对Docker容器管理的，另外还有一些关于Docker运行信息的获取Graph的存储与记录等，因此为了将Docker容器的管理从Docker Daemon内部业务逻辑中区分开来，设计了Driver层来管理这些请求。

Docker Driver中主要有：

1. grapg driver

主要完成容器镜像的管理，包括获取与存储

2. network driver

主要是来完成Docker容器的网络环境配置，其中包括在Docker启动时为Docker创建网桥，Docker创建时为其创建专属虚拟网卡设备，以及为Docker容器分配IP、端口并与宿主机做端口映射，设置容器防火墙策略等

3. execdriver

作为Docker容器的执行驱动，负责创建容器运行命名空间，负责容器资源使用的统计与限制，负责容器内部真正运行等。

# libcontainer ？

libcontainer 是 Docker 架构中一个使用 Go 语言设计实现的库，设计初衷是希望该库可以不依靠任何依赖，直接访问内核中与容器相关的 API。正是由于 libcontainer 的存在，Docker 可以直接调用 libcontainer，而最终操纵容器的 namespace、cgroups、apparmor、网络设备以及防火墙规则等。这一系列操作的完成都不需要依赖 LXC 或者其他包。

# Docker container ?

Docker container（Docker 容器）是 Docker 架构中服务交付的最终体现形式。

- 用户通过指定容器镜像，使得 Docker 容器可以自定义 rootfs 等文件系统
- 用户通过指定计算资源的配额，使得 Docker 容器使用指定的计算资源
- 用户通过配置网络及其安全策略，使得 Docker 容器拥有独立且安全的网络环境
- 用户通过指定运行的命令，使得 Docker 容器执行指定的工作
