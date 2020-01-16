<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Activity;

class ActivityController
{
    /**
     * @Route("/projects/{projectId}/activities/new", methods={"POST"})
     */
    public function newActivity(Request $request, EntityManagerInterface $em, $projectId)
    {
        $data = json_decode($request->getContent(), true);
        $name = $data['name'];
        $startedAt = null;
        $completedAt = null;
        $status = $data["status"];
 
        $activity = new Activity();
        $activity->setName($name)
            ->setStartedAt($startedAt)
            ->setCompletedAt($completedAt)
            ->setStatus($status)
            ->setProjectId($projectId);
 
        $em->persist($activity);
        $em->flush();
        $lastId = $activity->getId();
         
        return new Response($lastId);
    }
    
    /**
     * @Route("projects/{projectId}/activities")
     */
    public function allActivities($projectId, EntityManagerInterface $em)
    {
        $repository = $em->getRepository(Activity::class);
        $activities = $repository->transformAll($projectId);

        return new Response(json_encode($activities));
    }

    /**
     * @Route("/projects/{projectId}/activities/update/status", methods={"PUT"})
     */
    public function updateActivity(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $status = $data['status'];
        
        $repository = $em->getRepository(Activity::class); 
        $activity = $repository->find($id);
        
        if ($status === "in progress") {
            $activity->setStatus('in progress');
            $activity->setStartedAt(new \DateTime());
        } else if ($status === "completed") {
            $activity->setStatus('completed');
            $activity->setCompletedAt(new \DateTime());
        } else if ($status === "back") {
            $activity->setStatus('todo');
            $activity->setCompletedAt(null);
        }
        
        $em->persist($activity);
        $em->flush();

        return new Response("Updated activity with id " . $id);
    }

    /**
     * @Route("/projects/{projectId}/activities/update/name", methods={"PUT"})
     */
    public function updateActivityName(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $id = $data['id'];
        $name = $data['activityName'];
        
        $repository = $em->getRepository(Activity::class); 
        $activity = $repository->find($id);
        $activity->setName($name);
        
        $em->persist($activity);
        $em->flush();

        return new Response("Updated activity name with id " . $id);
    }

    /**
     * @Route("/projects/{projectId}/activities/{id}/delete", methods={"DELETE"})
     */
    public function deleteActivity(EntityManagerInterface $em, $id)
{
    $repository = $em->getRepository(Activity::class); 
    $activity = $repository->find($id); 

    $em->remove($activity);

    $em->flush();

    return new Response("Deleted activity with id " . $id);
}

    /**
     * @Route("projects/{projectId}/activities/{id}")
     */
    public function activityById($projectId, $id)
    {
        $activity = [];
        
        foreach ($this->activities as $value) {
            if ($value["projectId"] === $projectId && $value["id"] === $id) {
                $activity = $value;
            }
        }

        return new Response(json_encode($activity));
    }
}