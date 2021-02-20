FROM openjdk:11
VOLUME /tmp
COPY target/auth.jar auth.jar
ENTRYPOINT ["java","-jar","/auth.jar"]