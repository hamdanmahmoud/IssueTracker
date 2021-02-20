FROM openjdk:11
VOLUME /tmp
COPY target/project-0.0.1-SNAPSHOT.jar project.jar
ENTRYPOINT ["java","-jar","/project.jar"]