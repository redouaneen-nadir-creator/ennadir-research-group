import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from '@/i18n/LanguageContext'
import Layout from '@/components/layout/Layout'
import ScrollToTop from '@/components/layout/ScrollToTop'

import Home from '@/pages/Home'
import ResearchIndex from '@/pages/research/ResearchIndex'
import ResearchAreaDetail from '@/pages/research/ResearchAreaDetail'
import Facilities from '@/pages/research/Facilities'
import ProjectsIndex from '@/pages/projects/ProjectsIndex'
import ProjectDetail from '@/pages/projects/ProjectDetail'
import PublicationsIndex from '@/pages/publications/PublicationsIndex'
import PublicationDetail from '@/pages/publications/PublicationDetail'
import PeopleIndex from '@/pages/people/PeopleIndex'
import PersonDetail from '@/pages/people/PersonDetail'
import ResourcesIndex from '@/pages/resources/ResourcesIndex'
import SimulationsIndex from '@/pages/resources/SimulationsIndex'
import SimulationDetail from '@/pages/resources/SimulationDetail'
import CodesIndex from '@/pages/resources/CodesIndex'
import CodeDetail from '@/pages/resources/CodeDetail'
import MediaGallery from '@/pages/resources/MediaGallery'
import DocumentsIndex from '@/pages/resources/DocumentsIndex'
import DatasetsIndex from '@/pages/resources/DatasetsIndex'
import NewsIndex from '@/pages/news/NewsIndex'
import NewsDetail from '@/pages/news/NewsDetail'
import EventsIndex from '@/pages/events/EventsIndex'
import EventDetail from '@/pages/events/EventDetail'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Search from '@/pages/Search'
import NotFound from '@/pages/NotFound'

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />

            <Route path="research" element={<ResearchIndex />} />
            <Route path="research/facilities" element={<Facilities />} />
            <Route path="research/:slug" element={<ResearchAreaDetail />} />

            <Route path="projects" element={<ProjectsIndex />} />
            <Route path="projects/:slug" element={<ProjectDetail />} />

            <Route path="publications" element={<PublicationsIndex />} />
            <Route path="publications/:slug" element={<PublicationDetail />} />

            <Route path="people" element={<PeopleIndex />} />
            <Route path="people/:slug" element={<PersonDetail />} />

            <Route path="resources" element={<ResourcesIndex />} />
            <Route path="resources/simulations" element={<SimulationsIndex />} />
            <Route path="resources/simulations/:slug" element={<SimulationDetail />} />
            <Route path="resources/codes" element={<CodesIndex />} />
            <Route path="resources/codes/:slug" element={<CodeDetail />} />
            <Route path="resources/media" element={<MediaGallery />} />
            <Route path="resources/documents" element={<DocumentsIndex />} />
            <Route path="resources/datasets" element={<DatasetsIndex />} />

            <Route path="news" element={<NewsIndex />} />
            <Route path="news/:slug" element={<NewsDetail />} />

            <Route path="events" element={<EventsIndex />} />
            <Route path="events/:slug" element={<EventDetail />} />

            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="search" element={<Search />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  )
}
