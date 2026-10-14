import { course, docs, dsaBasicsStop, gitStop, interviewStop } from './shared';
import type { CareerPath } from './types';

export const ANDROID: CareerPath = {
  id: 'android',
  title: 'Android Developer',
  tagline: 'Build apps for the phones most Indians use',
  job: 'Builds Android apps in Kotlin with Jetpack Compose: screens, data, notifications and offline support, then publishes them on Google Play.',
  months: '7–9 months',
  icon: 'M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z M11 18h2',
  color: '#078A4A',
  ink: '#05703B',
  soft: '#E2F5EA',
  sections: [
    {
      title: 'Programming',
      stops: [
        {
          id: 'java',
          title: 'Java basics',
          why: 'Kotlin runs on the same platform as Java, and many older Android codebases are Java. Learning it first makes Kotlin easy.',
          modules: ['jv-hello', 'jv-vars', 'jv-if', 'jv-loops', 'jv-methods', 'jv-arrays', 'jv-strings'],
          optional: true,
        },
        {
          id: 'oop',
          title: 'Object-oriented programming',
          why: 'Classes, objects and inheritance: how every Android screen and component is built.',
          modules: ['jv-classes', 'jv-oop', 'jv-collections'],
        },
        {
          id: 'kotlin',
          title: 'Kotlin',
          why: 'Google’s official language for Android: shorter and safer than Java.',
          links: [docs('Kotlin getting started', 'https://kotlinlang.org/docs/getting-started.html')],
        },
        gitStop,
      ],
    },
    {
      title: 'Android basics',
      stops: [
        {
          id: 'android-basics',
          title: 'Your first apps',
          why: 'Install Android Studio, build simple apps and run them on your own phone.',
          links: [course('Android Basics with Compose (Google)', 'https://developer.android.com/courses/android-basics-compose/course', 'Free')],
        },
        {
          id: 'compose',
          title: 'Jetpack Compose UI',
          why: 'Build screens from composable functions: layouts, lists, themes and state.',
          links: [docs('Compose documentation', 'https://developer.android.com/develop/ui/compose/documentation')],
        },
        {
          id: 'navigation',
          title: 'Navigation and architecture',
          why: 'Move between screens and organise code with ViewModels so the app survives rotation and restarts.',
          links: [docs('Guide to app architecture', 'https://developer.android.com/topic/architecture')],
        },
      ],
    },
    {
      title: 'Data and the internet',
      stops: [
        {
          id: 'room',
          title: 'Saving data with Room',
          why: 'Store data on the phone so the app works offline.',
          links: [docs('Room database guide', 'https://developer.android.com/training/data-storage/room')],
        },
        {
          id: 'networking',
          title: 'Calling APIs',
          why: 'Fetch data from servers with Retrofit and show it in the app.',
          modules: ['n-json-1'],
          links: [
            course('Get data from the internet (Android codelab)', 'https://developer.android.com/codelabs/basic-android-kotlin-compose-getting-data-internet', 'Free'),
          ],
        },
        {
          id: 'sql',
          title: 'SQL basics',
          why: 'Room uses SQL under the hood; knowing it makes data bugs easy to fix.',
          modules: ['sql-select', 'sql-where', 'sql-order'],
        },
      ],
    },
    {
      title: 'Ship it',
      stops: [
        {
          id: 'project',
          title: 'Project: a complete app',
          why: 'A to-do, expense or quiz app with saved data and an API, good enough to publish.',
          project: true,
          links: [course('Android Basics with Compose (Google)', 'https://developer.android.com/courses/android-basics-compose/course', 'Free')],
        },
        {
          id: 'publish',
          title: 'Publish on Google Play',
          why: 'Signing, store listing and testing tracks, the same steps CodeYatra went through.',
          links: [docs('Google Play Console', 'https://play.google.com/console/about/')],
        },
      ],
    },
    {
      title: 'Get hired',
      stops: [dsaBasicsStop, interviewStop('Show your published app, explain its architecture, and answer Kotlin and Android lifecycle questions.')],
    },
  ],
};
