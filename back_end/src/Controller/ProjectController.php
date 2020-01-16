<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Project;
use App\Entity\Activity;

class ProjectController extends AbstractController
{  
    /**
     * @Route("/projects", methods={"GET"})
     */
    public function allProjects(EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Project::class);
        $projects = $repository->transformAll();

        return new Response(json_encode($projects));
    }

    /**
     * @Route("/projects/new", methods={"POST"})
     */
    public function newProject(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        if (!empty($data["startedAt"])) {
            $startedAt = new \DateTime($data["startedAt"]);
        } else {
            $startedAt = null;
        }
        if (!empty($data["completedAt"])) {
            $completedAt = new \DateTime($data["completedAt"]);
        } else {
            $completedAt = null;
        }
        $status = $data["status"];
        $slug = $data["slug"];

        $project = new Project();
        $project->setName($name)
            ->setStartedAt($startedAt)
            ->setCompletedAt($completedAt)
            ->setStatus($status)
            ->setUserId(1)
            ->setSlug($slug);

        $em->persist($project);
        $em->flush();
        $lastId = $project->getId();
        return new Response($lastId);
    }

    /**
     * @Route("/projects/update/status", methods={"PUT"})
     */
    public function completeProject(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $status = $data['status'];
        
        $repository = $em->getRepository(Project::class); 
        $project = $repository->find($id);
        
        if ($status === "active") {
            $project->setStatus('completed');
            $project->setCompletedAt(new \DateTime());
        } else if ($status === "completed") {
            $project->setStatus('active');
            $project->setCompletedAt(null);
        }
        
        $em->persist($project);
        $em->flush();

        return new Response("Updated project with id " . $id);
    }

    /**
     * @Route("/projects/update/name", methods={"PUT"})
     */
    public function updateProjectName(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $name = $data['projectName'];
        
        $repository = $em->getRepository(Project::class); 
        $project = $repository->find($id);
        $project->setName($name);
        
        $em->persist($project);
        $em->flush();

        return new Response("Updated project name with id " . $id);
    }

    /**
     * @Route("/projects/{id}/delete", methods={"DELETE"})
     */
    public function deleteProject(EntityManagerInterface $em, $id)
    {
        $repository = $em->getRepository(Project::class); 
        $project = $repository->find($id); 

        $em->remove($project);
        $em->flush();

        $repo = $em->getRepository(Activity::class); 
        $repo->deleteActivitiesByProjectId(intval($id)); 

        return new Response("Deleted project with id " . $id);  
    }

}