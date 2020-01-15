<?php

namespace App\Repository;

use App\Entity\Project;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Project|null find($id, $lockMode = null, $lockVersion = null)
 * @method Project|null findOneBy(array $criteria, array $orderBy = null)
 * @method Project[]    findAll()
 * @method Project[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProjectRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Project::class);
    }

    public function transform(Project $project)
    {
        if (!empty($project->getStartedAt())) {
            $obj = $project->getStartedAt();
            $startedAt = $obj->format("Y-m-d");
        } else {
            $startedAt = null;
        }
        if (!empty($project->getCompletedAt())) {
            $obj = $project->getCompletedAt();
            $completedAt = $obj->format("Y-m-d");
        } else {
            $completedAt = null;
        }

        return [
                'id'    => (int) $project->getId(),
                'name' => (string) $project->getName(),
                'startedAt' => $startedAt,
                'completedAt' => $completedAt,
                'status' => (string) $project->getStatus(),
                'userId' => $project->getUserId(),
        ];
    }

public function transformAll()
{
    $projects = $this->findAll();
    $projectsArray = [];

    foreach ($projects as $project) {
        $projectsArray[] = $this->transform($project);
    }

    return $projectsArray;
}

    // /**
    //  * @return Project[] Returns an array of Project objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('p.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Project
    {
        return $this->createQueryBuilder('p')
            ->andWhere('p.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
