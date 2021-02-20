FROM openjdk:11
VOLUME /tmp
COPY target/access-control-0.0.1-SNAPSHOT.jar accesscontrol.jar
ENTRYPOINT ["java","-jar","/accesscontrol.jar"]