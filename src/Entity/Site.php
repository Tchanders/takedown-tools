<?php

namespace App\Entity;

use App\Entity\User;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="site")
 *
 * @TODO add validation.
 */
class Site {

	/**
	 * @var int
	 *
	 * @ORM\Column(name="site_id", type="string", length=31)
	 * @ORM\Id
	 */
	private $id;

	/**
	 * @var Project
	 *
	 * @ORM\ManyToOne(targetEntity="App\Entity\Project")
   * @ORM\JoinColumn(name="project_id", referencedColumnName="project_id")
	 */
	private $project;

	/**
	 * Site
	 *
	 * @param array $data Data to construct the object.
	 */
	public function __construct( array $data = [] ) {
		$id = $data['id'] ?? null;
		$this->id = is_string( $id ) ? $id : null;

		$project = $data['project'] ?? null;
		if ( $project instanceof User ) {
			$this->project = $project;
		} elseif ( is_array( $project ) ) {
			$this->project = new Project( $project );
		} else {
			$this->project = null;
		}
	}

	/**
	 * Set Id.
	 *
	 * @param int $id ID
	 *
	 * @return self
	 */
	public function setId( int $id ) {
		$this->id = $id;

		return $this;
	}

	/**
	 * Get Id
	 *
	 * @return int
	 */
	public function getId() :? int {
		return $this->id;
	}

	/**
	 * Set Project.
	 *
	 * @param Project $project Project
	 *
	 * @return self
	 */
	public function setProject( Project $project ) {
		$this->project = $project;

		return $this;
	}

	/**
	 * Get Project
	 *
	 * @return Project
	 */
	public function getProject() :? Project {
		return $this->project;
	}

}
