<?php

namespace App\Repository;

use App\Entity\Activity;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Common\Persistence\ManagerRegistry;

/**
 * @method Activity|null find($id, $lockMode = null, $lockVersion = null)
 * @method Activity|null findOneBy(array $criteria, array $orderBy = null)
 * @method Activity[]    findAll()
 * @method Activity[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ActivityRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Activity::class);
    }

    public function transform(Activity $activity)
    {
        if (!empty($activity->getStartedAt())) {
            $obj = $activity->getStartedAt();
            $startedAt = $obj->format("Y-m-d");
        } else {
            $startedAt = null;
        }
        if (!empty($activity->getCompletedAt())) {
            $obj = $activity->getCompletedAt();
            $completedAt = $obj->format("Y-m-d");
        } else {
            $completedAt = null;
        }

        return [
                'id'    => (int) $activity->getId(),
                'name' => (string) $activity->getName(),
                'startedAt' => $startedAt,
                'completedAt' => $completedAt,
                'status' => (string) $activity->getStatus(),
                'projectId' => $activity->getProjectId(),
        ];
    }

    public function transformAll($projectId)
    {
        $activities = $this->findByProjectId($projectId);
        $activitiesArray = [];

        foreach ($activities as $activity) {
            $activitiesArray[] = $this->transform($activity);
        }

        return $activitiesArray;
    }

    // /**
    //  * @return Activity[] Returns an array of Activity objects
    //  */
    public function findByProjectId($projectId)
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.projectId = :val')
            ->setParameter('val', $projectId)
            ->orderBy('a.id', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }

    /*
    public function findOneBySomeField($value): ?Activity
    {
        return $this->createQueryBuilder('a')
            ->andWhere('a.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    
    /**
    * @return Project[] Returns an array of Project objects
    */
    
    public function deleteActivitiesByProjectId($id)
    {
        $conn = $this->getEntityManager()->getConnection();

        $sql = '
            DELETE FROM activity
            WHERE project_id = :id
        ';
        $stmt = $conn->prepare($sql);
        $stmt->execute(['id' => $id]);
    }
}
