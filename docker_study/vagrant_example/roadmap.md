# docker roadmap
- 이미지, 컨테이너 관련 작업 기본 기능 실습
- 도커 클라이언트, 서버 환경 PC에 구축
- node.js 웹 앱과 DB(mariadb) 인스턴스 연동, 무상태(stateless) 에서 어떻게 해야 할까?
- jenkins, chef 연동


# TIL 20170217
## mac에서 vagrant 환경 구축을 해보자
- 참조: http://bcho.tistory.com/806
- vagrant 가 뭐야? 라고 물어보면 어떻게 답변해야 할까?
    - 간소화된 VM관리 서비스야!
    - vmware, virtualbox 같은 hypervisor가 있어도 vm 생성하는것 자체가 번거로운 일.
- docker랑 다른점은... 완전한 운영체제를 가져오는 형태
- vagrant 는 vmware 기반, docker는 리눅스 커널의 cgroups, namespaces를 기반으로 함.

### flow
- virtualbox 설치
- vagrant 설치
- terminal에서 vagrant init precise32 http://files.vagrantup.com/precise32.box 명령 실행
    - ubuntu linux vm 실행을 위한 설정을 가져옴
    - 해당 폴더에 보면 Vagrantfile이 있을거다.
    - vagrant up 한다.
    - 리눅스 vm 을 다운로드 할 것.

#### vagrantfile 탐색
```
VAGRANTFILE_API_VERSION = "2"
 
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
  # config.vm.network :forwarded_port, guest: 80, host: 8080
  # config.vm.network :private_network, ip: "192.168.33.10"
  # config.vm.network :public_network
  # config.ssh.forward_agent = true
  config.vm.provider "virtualbox" do |vm|
        vm.customize [
               "modifyvm",:id,
               "--memory","512",
               "--name","Terry_vagrant0",
               "--cpus","2",
                       ]
  end
end
```
- 
http://files.vagrantup.com/precise32.box 에서 읽어와서, CPU 2개, 512M를 가진 “Terry_vargrant0”이라는 VM을 생성하는 Vagrantfile이다. 아래와 같이 파일을 생성한후에, vagrant up 명령을 수행시키면 설정한 정보 대로 VM이 생성된다.

#### vagrant provisioning
- vm 뿐 아니라 웹서버, db, middleware등을 설치하고 싶을 때 vagrantfile에 설정해준다.
- vm 기동된 후 웹서버 띄우는 예제

```
VAGRANTFILE_API_VERSION = "2"
 
Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = "precise32"
  config.vm.box_url = "http://files.vagrantup.com/precise32.box"
config.vm.provision :shell, :inline => "sudo apt-get install -y apache2"
 
end
```

- 자, 그렇다면... docker를 위한 vagrant 개발 환경 구성은 어떻게 할까?
- http://pyrasis.com/book/DockerForTheReallyImpatient/Chapter15/02
- 가장빨리만나는도커 책을 더 읽어봐야겠다.