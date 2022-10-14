FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build-env

WORKDIR /app

COPY ["/API/API.csproj", "app/API/"]
COPY ["/Infrastructure/Infrastructure.csproj", "app/Infrastructure/"]
COPY ["/Domain/Domain.csproj", "app/Domain/"]
COPY ["/Application/Application.csproj", "app/Application/"]

RUN dotnet restore "app/API/API.csproj"

COPY . .

WORKDIR "/app/API/"

RUN dotnet publish -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine

WORKDIR /app

COPY --from=build-env /app/publish .

EXPOSE 5000

ENTRYPOINT [ "dotnet", "api.dll" ]