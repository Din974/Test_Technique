# Projet Backend CRUD avec NestJS et PostgreSQL

Ce projet a été créé pour répondre à l'exercice CRUD (Create, Read, Update, Delete) avec NestJS et PostgreSQL.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé Node.js et PostgreSQL sur votre système.

## Installation

Installez les dépendances en exécutant la commande suivante :

```bash
npm install
```

## Configuration de la base de données

La configuration de la base de données se fait dans le fichier app.module.ts : 

```ts
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      password: 'votre_mot_de_passe',
      username: 'postgres',
      entities: [User],
      database: 'votre_database',
      synchronize: true,
      logging: true,
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService, {
    provide: APP_INTERCEPTOR,
    useClass: PerformanceInterceptor,
  },],
})
```

## Execution

Pour lancer le serveur, utilisez la commande :

```bash
npm run start
```

Le serveur démarrera à l'adresse http://localhost:3000 par défaut.
